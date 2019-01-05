package fr.icdc.dei.da1.web.rest;

import fr.icdc.dei.da1.JhipGitRepoApp;

import fr.icdc.dei.da1.domain.JenkinsJob;
import fr.icdc.dei.da1.repository.JenkinsJobRepository;
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

import fr.icdc.dei.da1.domain.enumeration.JenkinsJobType;
/**
 * Test class for the JenkinsJobResource REST controller.
 *
 * @see JenkinsJobResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipGitRepoApp.class)
public class JenkinsJobResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final JenkinsJobType DEFAULT_TYPE = JenkinsJobType.INT_BUILD;
    private static final JenkinsJobType UPDATED_TYPE = JenkinsJobType.INT_DEPLOY;

    @Autowired
    private JenkinsJobRepository jenkinsJobRepository;

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

    private MockMvc restJenkinsJobMockMvc;

    private JenkinsJob jenkinsJob;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JenkinsJobResource jenkinsJobResource = new JenkinsJobResource(jenkinsJobRepository);
        this.restJenkinsJobMockMvc = MockMvcBuilders.standaloneSetup(jenkinsJobResource)
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
    public static JenkinsJob createEntity(EntityManager em) {
        JenkinsJob jenkinsJob = new JenkinsJob()
            .url(DEFAULT_URL)
            .type(DEFAULT_TYPE);
        return jenkinsJob;
    }

    @Before
    public void initTest() {
        jenkinsJob = createEntity(em);
    }

    @Test
    @Transactional
    public void createJenkinsJob() throws Exception {
        int databaseSizeBeforeCreate = jenkinsJobRepository.findAll().size();

        // Create the JenkinsJob
        restJenkinsJobMockMvc.perform(post("/api/jenkins-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsJob)))
            .andExpect(status().isCreated());

        // Validate the JenkinsJob in the database
        List<JenkinsJob> jenkinsJobList = jenkinsJobRepository.findAll();
        assertThat(jenkinsJobList).hasSize(databaseSizeBeforeCreate + 1);
        JenkinsJob testJenkinsJob = jenkinsJobList.get(jenkinsJobList.size() - 1);
        assertThat(testJenkinsJob.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testJenkinsJob.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createJenkinsJobWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jenkinsJobRepository.findAll().size();

        // Create the JenkinsJob with an existing ID
        jenkinsJob.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJenkinsJobMockMvc.perform(post("/api/jenkins-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsJob)))
            .andExpect(status().isBadRequest());

        // Validate the JenkinsJob in the database
        List<JenkinsJob> jenkinsJobList = jenkinsJobRepository.findAll();
        assertThat(jenkinsJobList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJenkinsJobs() throws Exception {
        // Initialize the database
        jenkinsJobRepository.saveAndFlush(jenkinsJob);

        // Get all the jenkinsJobList
        restJenkinsJobMockMvc.perform(get("/api/jenkins-jobs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jenkinsJob.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getJenkinsJob() throws Exception {
        // Initialize the database
        jenkinsJobRepository.saveAndFlush(jenkinsJob);

        // Get the jenkinsJob
        restJenkinsJobMockMvc.perform(get("/api/jenkins-jobs/{id}", jenkinsJob.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jenkinsJob.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJenkinsJob() throws Exception {
        // Get the jenkinsJob
        restJenkinsJobMockMvc.perform(get("/api/jenkins-jobs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJenkinsJob() throws Exception {
        // Initialize the database
        jenkinsJobRepository.saveAndFlush(jenkinsJob);

        int databaseSizeBeforeUpdate = jenkinsJobRepository.findAll().size();

        // Update the jenkinsJob
        JenkinsJob updatedJenkinsJob = jenkinsJobRepository.findById(jenkinsJob.getId()).get();
        // Disconnect from session so that the updates on updatedJenkinsJob are not directly saved in db
        em.detach(updatedJenkinsJob);
        updatedJenkinsJob
            .url(UPDATED_URL)
            .type(UPDATED_TYPE);

        restJenkinsJobMockMvc.perform(put("/api/jenkins-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJenkinsJob)))
            .andExpect(status().isOk());

        // Validate the JenkinsJob in the database
        List<JenkinsJob> jenkinsJobList = jenkinsJobRepository.findAll();
        assertThat(jenkinsJobList).hasSize(databaseSizeBeforeUpdate);
        JenkinsJob testJenkinsJob = jenkinsJobList.get(jenkinsJobList.size() - 1);
        assertThat(testJenkinsJob.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testJenkinsJob.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingJenkinsJob() throws Exception {
        int databaseSizeBeforeUpdate = jenkinsJobRepository.findAll().size();

        // Create the JenkinsJob

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJenkinsJobMockMvc.perform(put("/api/jenkins-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsJob)))
            .andExpect(status().isBadRequest());

        // Validate the JenkinsJob in the database
        List<JenkinsJob> jenkinsJobList = jenkinsJobRepository.findAll();
        assertThat(jenkinsJobList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJenkinsJob() throws Exception {
        // Initialize the database
        jenkinsJobRepository.saveAndFlush(jenkinsJob);

        int databaseSizeBeforeDelete = jenkinsJobRepository.findAll().size();

        // Get the jenkinsJob
        restJenkinsJobMockMvc.perform(delete("/api/jenkins-jobs/{id}", jenkinsJob.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JenkinsJob> jenkinsJobList = jenkinsJobRepository.findAll();
        assertThat(jenkinsJobList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JenkinsJob.class);
        JenkinsJob jenkinsJob1 = new JenkinsJob();
        jenkinsJob1.setId(1L);
        JenkinsJob jenkinsJob2 = new JenkinsJob();
        jenkinsJob2.setId(jenkinsJob1.getId());
        assertThat(jenkinsJob1).isEqualTo(jenkinsJob2);
        jenkinsJob2.setId(2L);
        assertThat(jenkinsJob1).isNotEqualTo(jenkinsJob2);
        jenkinsJob1.setId(null);
        assertThat(jenkinsJob1).isNotEqualTo(jenkinsJob2);
    }
}
