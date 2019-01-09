package fr.icdc.dei.da1.web.rest;

import fr.icdc.dei.da1.JhipGitRepoApp;

import fr.icdc.dei.da1.domain.GitCommit;
import fr.icdc.dei.da1.repository.GitCommitRepository;
import fr.icdc.dei.da1.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static fr.icdc.dei.da1.web.rest.TestUtil.sameInstant;
import static fr.icdc.dei.da1.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GitCommitResource REST controller.
 *
 * @see GitCommitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipGitRepoApp.class)
public class GitCommitResourceIntTest {

    private static final String DEFAULT_GIT_COMMIT_HASH = "AAAAAAAAAA";
    private static final String UPDATED_GIT_COMMIT_HASH = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_COMMIT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_COMMIT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final String DEFAULT_BRANCH = "AAAAAAAAAA";
    private static final String UPDATED_BRANCH = "BBBBBBBBBB";

    @Autowired
    private GitCommitRepository gitCommitRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restGitCommitMockMvc;

    private GitCommit gitCommit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GitCommitResource gitCommitResource = new GitCommitResource(gitCommitRepository);
        this.restGitCommitMockMvc = MockMvcBuilders.standaloneSetup(gitCommitResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GitCommit createEntity(EntityManager em) {
        GitCommit gitCommit = new GitCommit()
            .gitCommitHash(DEFAULT_GIT_COMMIT_HASH)
            .commitDate(DEFAULT_COMMIT_DATE)
            .message(DEFAULT_MESSAGE)
            .branch(DEFAULT_BRANCH);
        return gitCommit;
    }

    @Before
    public void initTest() {
        gitCommit = createEntity(em);
    }

    @Test
    @Transactional
    public void createGitCommit() throws Exception {
        int databaseSizeBeforeCreate = gitCommitRepository.findAll().size();

        // Create the GitCommit
        restGitCommitMockMvc.perform(post("/api/git-commits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitCommit)))
            .andExpect(status().isCreated());

        // Validate the GitCommit in the database
        List<GitCommit> gitCommitList = gitCommitRepository.findAll();
        assertThat(gitCommitList).hasSize(databaseSizeBeforeCreate + 1);
        GitCommit testGitCommit = gitCommitList.get(gitCommitList.size() - 1);
        assertThat(testGitCommit.getGitCommitHash()).isEqualTo(DEFAULT_GIT_COMMIT_HASH);
        assertThat(testGitCommit.getCommitDate()).isEqualTo(DEFAULT_COMMIT_DATE);
        assertThat(testGitCommit.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testGitCommit.getBranch()).isEqualTo(DEFAULT_BRANCH);
    }

    @Test
    @Transactional
    public void createGitCommitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gitCommitRepository.findAll().size();

        // Create the GitCommit with an existing ID
        gitCommit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGitCommitMockMvc.perform(post("/api/git-commits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitCommit)))
            .andExpect(status().isBadRequest());

        // Validate the GitCommit in the database
        List<GitCommit> gitCommitList = gitCommitRepository.findAll();
        assertThat(gitCommitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGitCommits() throws Exception {
        // Initialize the database
        gitCommitRepository.saveAndFlush(gitCommit);

        // Get all the gitCommitList
        restGitCommitMockMvc.perform(get("/api/git-commits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gitCommit.getId().intValue())))
            .andExpect(jsonPath("$.[*].gitCommitHash").value(hasItem(DEFAULT_GIT_COMMIT_HASH.toString())))
            .andExpect(jsonPath("$.[*].commitDate").value(hasItem(sameInstant(DEFAULT_COMMIT_DATE))))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].branch").value(hasItem(DEFAULT_BRANCH.toString())));
    }
    
    @Test
    @Transactional
    public void getGitCommit() throws Exception {
        // Initialize the database
        gitCommitRepository.saveAndFlush(gitCommit);

        // Get the gitCommit
        restGitCommitMockMvc.perform(get("/api/git-commits/{id}", gitCommit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gitCommit.getId().intValue()))
            .andExpect(jsonPath("$.gitCommitHash").value(DEFAULT_GIT_COMMIT_HASH.toString()))
            .andExpect(jsonPath("$.commitDate").value(sameInstant(DEFAULT_COMMIT_DATE)))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.branch").value(DEFAULT_BRANCH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGitCommit() throws Exception {
        // Get the gitCommit
        restGitCommitMockMvc.perform(get("/api/git-commits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGitCommit() throws Exception {
        // Initialize the database
        gitCommitRepository.saveAndFlush(gitCommit);

        int databaseSizeBeforeUpdate = gitCommitRepository.findAll().size();

        // Update the gitCommit
        GitCommit updatedGitCommit = gitCommitRepository.findById(gitCommit.getId()).get();
        // Disconnect from session so that the updates on updatedGitCommit are not directly saved in db
        em.detach(updatedGitCommit);
        updatedGitCommit
            .gitCommitHash(UPDATED_GIT_COMMIT_HASH)
            .commitDate(UPDATED_COMMIT_DATE)
            .message(UPDATED_MESSAGE)
            .branch(UPDATED_BRANCH);

        restGitCommitMockMvc.perform(put("/api/git-commits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGitCommit)))
            .andExpect(status().isOk());

        // Validate the GitCommit in the database
        List<GitCommit> gitCommitList = gitCommitRepository.findAll();
        assertThat(gitCommitList).hasSize(databaseSizeBeforeUpdate);
        GitCommit testGitCommit = gitCommitList.get(gitCommitList.size() - 1);
        assertThat(testGitCommit.getGitCommitHash()).isEqualTo(UPDATED_GIT_COMMIT_HASH);
        assertThat(testGitCommit.getCommitDate()).isEqualTo(UPDATED_COMMIT_DATE);
        assertThat(testGitCommit.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testGitCommit.getBranch()).isEqualTo(UPDATED_BRANCH);
    }

    @Test
    @Transactional
    public void updateNonExistingGitCommit() throws Exception {
        int databaseSizeBeforeUpdate = gitCommitRepository.findAll().size();

        // Create the GitCommit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGitCommitMockMvc.perform(put("/api/git-commits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitCommit)))
            .andExpect(status().isBadRequest());

        // Validate the GitCommit in the database
        List<GitCommit> gitCommitList = gitCommitRepository.findAll();
        assertThat(gitCommitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGitCommit() throws Exception {
        // Initialize the database
        gitCommitRepository.saveAndFlush(gitCommit);

        int databaseSizeBeforeDelete = gitCommitRepository.findAll().size();

        // Get the gitCommit
        restGitCommitMockMvc.perform(delete("/api/git-commits/{id}", gitCommit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GitCommit> gitCommitList = gitCommitRepository.findAll();
        assertThat(gitCommitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GitCommit.class);
        GitCommit gitCommit1 = new GitCommit();
        gitCommit1.setId(1L);
        GitCommit gitCommit2 = new GitCommit();
        gitCommit2.setId(gitCommit1.getId());
        assertThat(gitCommit1).isEqualTo(gitCommit2);
        gitCommit2.setId(2L);
        assertThat(gitCommit1).isNotEqualTo(gitCommit2);
        gitCommit1.setId(null);
        assertThat(gitCommit1).isNotEqualTo(gitCommit2);
    }
}
