package fr.icdc.dei.da1.web.rest;

import fr.icdc.dei.da1.JhipGitRepoApp;

import fr.icdc.dei.da1.domain.JenkinsFolder;
import fr.icdc.dei.da1.repository.JenkinsFolderRepository;
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
 * Test class for the JenkinsFolderResource REST controller.
 *
 * @see JenkinsFolderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipGitRepoApp.class)
public class JenkinsFolderResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private JenkinsFolderRepository jenkinsFolderRepository;

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

    private MockMvc restJenkinsFolderMockMvc;

    private JenkinsFolder jenkinsFolder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JenkinsFolderResource jenkinsFolderResource = new JenkinsFolderResource(jenkinsFolderRepository);
        this.restJenkinsFolderMockMvc = MockMvcBuilders.standaloneSetup(jenkinsFolderResource)
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
    public static JenkinsFolder createEntity(EntityManager em) {
        JenkinsFolder jenkinsFolder = new JenkinsFolder()
            .url(DEFAULT_URL);
        return jenkinsFolder;
    }

    @Before
    public void initTest() {
        jenkinsFolder = createEntity(em);
    }

    @Test
    @Transactional
    public void createJenkinsFolder() throws Exception {
        int databaseSizeBeforeCreate = jenkinsFolderRepository.findAll().size();

        // Create the JenkinsFolder
        restJenkinsFolderMockMvc.perform(post("/api/jenkins-folders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsFolder)))
            .andExpect(status().isCreated());

        // Validate the JenkinsFolder in the database
        List<JenkinsFolder> jenkinsFolderList = jenkinsFolderRepository.findAll();
        assertThat(jenkinsFolderList).hasSize(databaseSizeBeforeCreate + 1);
        JenkinsFolder testJenkinsFolder = jenkinsFolderList.get(jenkinsFolderList.size() - 1);
        assertThat(testJenkinsFolder.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createJenkinsFolderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jenkinsFolderRepository.findAll().size();

        // Create the JenkinsFolder with an existing ID
        jenkinsFolder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJenkinsFolderMockMvc.perform(post("/api/jenkins-folders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsFolder)))
            .andExpect(status().isBadRequest());

        // Validate the JenkinsFolder in the database
        List<JenkinsFolder> jenkinsFolderList = jenkinsFolderRepository.findAll();
        assertThat(jenkinsFolderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJenkinsFolders() throws Exception {
        // Initialize the database
        jenkinsFolderRepository.saveAndFlush(jenkinsFolder);

        // Get all the jenkinsFolderList
        restJenkinsFolderMockMvc.perform(get("/api/jenkins-folders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jenkinsFolder.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }
    
    @Test
    @Transactional
    public void getJenkinsFolder() throws Exception {
        // Initialize the database
        jenkinsFolderRepository.saveAndFlush(jenkinsFolder);

        // Get the jenkinsFolder
        restJenkinsFolderMockMvc.perform(get("/api/jenkins-folders/{id}", jenkinsFolder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jenkinsFolder.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJenkinsFolder() throws Exception {
        // Get the jenkinsFolder
        restJenkinsFolderMockMvc.perform(get("/api/jenkins-folders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJenkinsFolder() throws Exception {
        // Initialize the database
        jenkinsFolderRepository.saveAndFlush(jenkinsFolder);

        int databaseSizeBeforeUpdate = jenkinsFolderRepository.findAll().size();

        // Update the jenkinsFolder
        JenkinsFolder updatedJenkinsFolder = jenkinsFolderRepository.findById(jenkinsFolder.getId()).get();
        // Disconnect from session so that the updates on updatedJenkinsFolder are not directly saved in db
        em.detach(updatedJenkinsFolder);
        updatedJenkinsFolder
            .url(UPDATED_URL);

        restJenkinsFolderMockMvc.perform(put("/api/jenkins-folders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJenkinsFolder)))
            .andExpect(status().isOk());

        // Validate the JenkinsFolder in the database
        List<JenkinsFolder> jenkinsFolderList = jenkinsFolderRepository.findAll();
        assertThat(jenkinsFolderList).hasSize(databaseSizeBeforeUpdate);
        JenkinsFolder testJenkinsFolder = jenkinsFolderList.get(jenkinsFolderList.size() - 1);
        assertThat(testJenkinsFolder.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingJenkinsFolder() throws Exception {
        int databaseSizeBeforeUpdate = jenkinsFolderRepository.findAll().size();

        // Create the JenkinsFolder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJenkinsFolderMockMvc.perform(put("/api/jenkins-folders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsFolder)))
            .andExpect(status().isBadRequest());

        // Validate the JenkinsFolder in the database
        List<JenkinsFolder> jenkinsFolderList = jenkinsFolderRepository.findAll();
        assertThat(jenkinsFolderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJenkinsFolder() throws Exception {
        // Initialize the database
        jenkinsFolderRepository.saveAndFlush(jenkinsFolder);

        int databaseSizeBeforeDelete = jenkinsFolderRepository.findAll().size();

        // Get the jenkinsFolder
        restJenkinsFolderMockMvc.perform(delete("/api/jenkins-folders/{id}", jenkinsFolder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JenkinsFolder> jenkinsFolderList = jenkinsFolderRepository.findAll();
        assertThat(jenkinsFolderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JenkinsFolder.class);
        JenkinsFolder jenkinsFolder1 = new JenkinsFolder();
        jenkinsFolder1.setId(1L);
        JenkinsFolder jenkinsFolder2 = new JenkinsFolder();
        jenkinsFolder2.setId(jenkinsFolder1.getId());
        assertThat(jenkinsFolder1).isEqualTo(jenkinsFolder2);
        jenkinsFolder2.setId(2L);
        assertThat(jenkinsFolder1).isNotEqualTo(jenkinsFolder2);
        jenkinsFolder1.setId(null);
        assertThat(jenkinsFolder1).isNotEqualTo(jenkinsFolder2);
    }
}
