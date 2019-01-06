package fr.icdc.dei.da1.web.rest;

import fr.icdc.dei.da1.JhipGitRepoApp;

import fr.icdc.dei.da1.domain.ProjectComponent;
import fr.icdc.dei.da1.repository.ProjectComponentRepository;
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

import fr.icdc.dei.da1.domain.enumeration.ComponentType;
/**
 * Test class for the ProjectComponentResource REST controller.
 *
 * @see ProjectComponentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipGitRepoApp.class)
public class ProjectComponentResourceIntTest {

    private static final ComponentType DEFAULT_TYPE = ComponentType.POM;
    private static final ComponentType UPDATED_TYPE = ComponentType.JAR;

    @Autowired
    private ProjectComponentRepository projectComponentRepository;

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

    private MockMvc restProjectComponentMockMvc;

    private ProjectComponent projectComponent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjectComponentResource projectComponentResource = new ProjectComponentResource(projectComponentRepository);
        this.restProjectComponentMockMvc = MockMvcBuilders.standaloneSetup(projectComponentResource)
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
    public static ProjectComponent createEntity(EntityManager em) {
        ProjectComponent projectComponent = new ProjectComponent()
            .type(DEFAULT_TYPE);
        return projectComponent;
    }

    @Before
    public void initTest() {
        projectComponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjectComponent() throws Exception {
        int databaseSizeBeforeCreate = projectComponentRepository.findAll().size();

        // Create the ProjectComponent
        restProjectComponentMockMvc.perform(post("/api/project-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectComponent)))
            .andExpect(status().isCreated());

        // Validate the ProjectComponent in the database
        List<ProjectComponent> projectComponentList = projectComponentRepository.findAll();
        assertThat(projectComponentList).hasSize(databaseSizeBeforeCreate + 1);
        ProjectComponent testProjectComponent = projectComponentList.get(projectComponentList.size() - 1);
        assertThat(testProjectComponent.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createProjectComponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectComponentRepository.findAll().size();

        // Create the ProjectComponent with an existing ID
        projectComponent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectComponentMockMvc.perform(post("/api/project-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectComponent)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectComponent in the database
        List<ProjectComponent> projectComponentList = projectComponentRepository.findAll();
        assertThat(projectComponentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProjectComponents() throws Exception {
        // Initialize the database
        projectComponentRepository.saveAndFlush(projectComponent);

        // Get all the projectComponentList
        restProjectComponentMockMvc.perform(get("/api/project-components?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectComponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getProjectComponent() throws Exception {
        // Initialize the database
        projectComponentRepository.saveAndFlush(projectComponent);

        // Get the projectComponent
        restProjectComponentMockMvc.perform(get("/api/project-components/{id}", projectComponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(projectComponent.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProjectComponent() throws Exception {
        // Get the projectComponent
        restProjectComponentMockMvc.perform(get("/api/project-components/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjectComponent() throws Exception {
        // Initialize the database
        projectComponentRepository.saveAndFlush(projectComponent);

        int databaseSizeBeforeUpdate = projectComponentRepository.findAll().size();

        // Update the projectComponent
        ProjectComponent updatedProjectComponent = projectComponentRepository.findById(projectComponent.getId()).get();
        // Disconnect from session so that the updates on updatedProjectComponent are not directly saved in db
        em.detach(updatedProjectComponent);
        updatedProjectComponent
            .type(UPDATED_TYPE);

        restProjectComponentMockMvc.perform(put("/api/project-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjectComponent)))
            .andExpect(status().isOk());

        // Validate the ProjectComponent in the database
        List<ProjectComponent> projectComponentList = projectComponentRepository.findAll();
        assertThat(projectComponentList).hasSize(databaseSizeBeforeUpdate);
        ProjectComponent testProjectComponent = projectComponentList.get(projectComponentList.size() - 1);
        assertThat(testProjectComponent.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProjectComponent() throws Exception {
        int databaseSizeBeforeUpdate = projectComponentRepository.findAll().size();

        // Create the ProjectComponent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectComponentMockMvc.perform(put("/api/project-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectComponent)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectComponent in the database
        List<ProjectComponent> projectComponentList = projectComponentRepository.findAll();
        assertThat(projectComponentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjectComponent() throws Exception {
        // Initialize the database
        projectComponentRepository.saveAndFlush(projectComponent);

        int databaseSizeBeforeDelete = projectComponentRepository.findAll().size();

        // Get the projectComponent
        restProjectComponentMockMvc.perform(delete("/api/project-components/{id}", projectComponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProjectComponent> projectComponentList = projectComponentRepository.findAll();
        assertThat(projectComponentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectComponent.class);
        ProjectComponent projectComponent1 = new ProjectComponent();
        projectComponent1.setId(1L);
        ProjectComponent projectComponent2 = new ProjectComponent();
        projectComponent2.setId(projectComponent1.getId());
        assertThat(projectComponent1).isEqualTo(projectComponent2);
        projectComponent2.setId(2L);
        assertThat(projectComponent1).isNotEqualTo(projectComponent2);
        projectComponent1.setId(null);
        assertThat(projectComponent1).isNotEqualTo(projectComponent2);
    }
}
