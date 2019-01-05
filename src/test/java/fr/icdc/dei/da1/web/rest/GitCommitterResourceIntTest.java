package fr.icdc.dei.da1.web.rest;

import fr.icdc.dei.da1.JhipGitRepoApp;

import fr.icdc.dei.da1.domain.GitCommitter;
import fr.icdc.dei.da1.repository.GitCommitterRepository;
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
import java.util.List;


import static fr.icdc.dei.da1.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GitCommitterResource REST controller.
 *
 * @see GitCommitterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipGitRepoApp.class)
public class GitCommitterResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GitCommitterRepository gitCommitterRepository;

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

    private MockMvc restGitCommitterMockMvc;

    private GitCommitter gitCommitter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GitCommitterResource gitCommitterResource = new GitCommitterResource(gitCommitterRepository);
        this.restGitCommitterMockMvc = MockMvcBuilders.standaloneSetup(gitCommitterResource)
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
    public static GitCommitter createEntity(EntityManager em) {
        GitCommitter gitCommitter = new GitCommitter()
            .name(DEFAULT_NAME);
        return gitCommitter;
    }

    @Before
    public void initTest() {
        gitCommitter = createEntity(em);
    }

    @Test
    @Transactional
    public void createGitCommitter() throws Exception {
        int databaseSizeBeforeCreate = gitCommitterRepository.findAll().size();

        // Create the GitCommitter
        restGitCommitterMockMvc.perform(post("/api/git-committers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitCommitter)))
            .andExpect(status().isCreated());

        // Validate the GitCommitter in the database
        List<GitCommitter> gitCommitterList = gitCommitterRepository.findAll();
        assertThat(gitCommitterList).hasSize(databaseSizeBeforeCreate + 1);
        GitCommitter testGitCommitter = gitCommitterList.get(gitCommitterList.size() - 1);
        assertThat(testGitCommitter.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGitCommitterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gitCommitterRepository.findAll().size();

        // Create the GitCommitter with an existing ID
        gitCommitter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGitCommitterMockMvc.perform(post("/api/git-committers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitCommitter)))
            .andExpect(status().isBadRequest());

        // Validate the GitCommitter in the database
        List<GitCommitter> gitCommitterList = gitCommitterRepository.findAll();
        assertThat(gitCommitterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGitCommitters() throws Exception {
        // Initialize the database
        gitCommitterRepository.saveAndFlush(gitCommitter);

        // Get all the gitCommitterList
        restGitCommitterMockMvc.perform(get("/api/git-committers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gitCommitter.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getGitCommitter() throws Exception {
        // Initialize the database
        gitCommitterRepository.saveAndFlush(gitCommitter);

        // Get the gitCommitter
        restGitCommitterMockMvc.perform(get("/api/git-committers/{id}", gitCommitter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gitCommitter.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGitCommitter() throws Exception {
        // Get the gitCommitter
        restGitCommitterMockMvc.perform(get("/api/git-committers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGitCommitter() throws Exception {
        // Initialize the database
        gitCommitterRepository.saveAndFlush(gitCommitter);

        int databaseSizeBeforeUpdate = gitCommitterRepository.findAll().size();

        // Update the gitCommitter
        GitCommitter updatedGitCommitter = gitCommitterRepository.findById(gitCommitter.getId()).get();
        // Disconnect from session so that the updates on updatedGitCommitter are not directly saved in db
        em.detach(updatedGitCommitter);
        updatedGitCommitter
            .name(UPDATED_NAME);

        restGitCommitterMockMvc.perform(put("/api/git-committers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGitCommitter)))
            .andExpect(status().isOk());

        // Validate the GitCommitter in the database
        List<GitCommitter> gitCommitterList = gitCommitterRepository.findAll();
        assertThat(gitCommitterList).hasSize(databaseSizeBeforeUpdate);
        GitCommitter testGitCommitter = gitCommitterList.get(gitCommitterList.size() - 1);
        assertThat(testGitCommitter.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGitCommitter() throws Exception {
        int databaseSizeBeforeUpdate = gitCommitterRepository.findAll().size();

        // Create the GitCommitter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGitCommitterMockMvc.perform(put("/api/git-committers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitCommitter)))
            .andExpect(status().isBadRequest());

        // Validate the GitCommitter in the database
        List<GitCommitter> gitCommitterList = gitCommitterRepository.findAll();
        assertThat(gitCommitterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGitCommitter() throws Exception {
        // Initialize the database
        gitCommitterRepository.saveAndFlush(gitCommitter);

        int databaseSizeBeforeDelete = gitCommitterRepository.findAll().size();

        // Get the gitCommitter
        restGitCommitterMockMvc.perform(delete("/api/git-committers/{id}", gitCommitter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GitCommitter> gitCommitterList = gitCommitterRepository.findAll();
        assertThat(gitCommitterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GitCommitter.class);
        GitCommitter gitCommitter1 = new GitCommitter();
        gitCommitter1.setId(1L);
        GitCommitter gitCommitter2 = new GitCommitter();
        gitCommitter2.setId(gitCommitter1.getId());
        assertThat(gitCommitter1).isEqualTo(gitCommitter2);
        gitCommitter2.setId(2L);
        assertThat(gitCommitter1).isNotEqualTo(gitCommitter2);
        gitCommitter1.setId(null);
        assertThat(gitCommitter1).isNotEqualTo(gitCommitter2);
    }
}
