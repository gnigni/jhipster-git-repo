package fr.icdc.dei.da1.web.rest;

import fr.icdc.dei.da1.JhipGitRepoApp;

import fr.icdc.dei.da1.domain.SonarComponent;
import fr.icdc.dei.da1.repository.SonarComponentRepository;
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

import fr.icdc.dei.da1.domain.enumeration.SonarQualifier;
/**
 * Test class for the SonarComponentResource REST controller.
 *
 * @see SonarComponentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipGitRepoApp.class)
public class SonarComponentResourceIntTest {

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_COMPONENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_COMPONENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_COMPONENT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_COMPONENT_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final SonarQualifier DEFAULT_QUALIFIER = SonarQualifier.BRC;
    private static final SonarQualifier UPDATED_QUALIFIER = SonarQualifier.DIR;

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    @Autowired
    private SonarComponentRepository sonarComponentRepository;

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

    private MockMvc restSonarComponentMockMvc;

    private SonarComponent sonarComponent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SonarComponentResource sonarComponentResource = new SonarComponentResource(sonarComponentRepository);
        this.restSonarComponentMockMvc = MockMvcBuilders.standaloneSetup(sonarComponentResource)
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
    public static SonarComponent createEntity(EntityManager em) {
        SonarComponent sonarComponent = new SonarComponent()
            .organization(DEFAULT_ORGANIZATION)
            .componentId(DEFAULT_COMPONENT_ID)
            .componentKey(DEFAULT_COMPONENT_KEY)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .qualifier(DEFAULT_QUALIFIER)
            .path(DEFAULT_PATH);
        return sonarComponent;
    }

    @Before
    public void initTest() {
        sonarComponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createSonarComponent() throws Exception {
        int databaseSizeBeforeCreate = sonarComponentRepository.findAll().size();

        // Create the SonarComponent
        restSonarComponentMockMvc.perform(post("/api/sonar-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sonarComponent)))
            .andExpect(status().isCreated());

        // Validate the SonarComponent in the database
        List<SonarComponent> sonarComponentList = sonarComponentRepository.findAll();
        assertThat(sonarComponentList).hasSize(databaseSizeBeforeCreate + 1);
        SonarComponent testSonarComponent = sonarComponentList.get(sonarComponentList.size() - 1);
        assertThat(testSonarComponent.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testSonarComponent.getComponentId()).isEqualTo(DEFAULT_COMPONENT_ID);
        assertThat(testSonarComponent.getComponentKey()).isEqualTo(DEFAULT_COMPONENT_KEY);
        assertThat(testSonarComponent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSonarComponent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSonarComponent.getQualifier()).isEqualTo(DEFAULT_QUALIFIER);
        assertThat(testSonarComponent.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createSonarComponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sonarComponentRepository.findAll().size();

        // Create the SonarComponent with an existing ID
        sonarComponent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSonarComponentMockMvc.perform(post("/api/sonar-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sonarComponent)))
            .andExpect(status().isBadRequest());

        // Validate the SonarComponent in the database
        List<SonarComponent> sonarComponentList = sonarComponentRepository.findAll();
        assertThat(sonarComponentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSonarComponents() throws Exception {
        // Initialize the database
        sonarComponentRepository.saveAndFlush(sonarComponent);

        // Get all the sonarComponentList
        restSonarComponentMockMvc.perform(get("/api/sonar-components?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sonarComponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION.toString())))
            .andExpect(jsonPath("$.[*].componentId").value(hasItem(DEFAULT_COMPONENT_ID.toString())))
            .andExpect(jsonPath("$.[*].componentKey").value(hasItem(DEFAULT_COMPONENT_KEY.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].qualifier").value(hasItem(DEFAULT_QUALIFIER.toString())))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }
    
    @Test
    @Transactional
    public void getSonarComponent() throws Exception {
        // Initialize the database
        sonarComponentRepository.saveAndFlush(sonarComponent);

        // Get the sonarComponent
        restSonarComponentMockMvc.perform(get("/api/sonar-components/{id}", sonarComponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sonarComponent.getId().intValue()))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION.toString()))
            .andExpect(jsonPath("$.componentId").value(DEFAULT_COMPONENT_ID.toString()))
            .andExpect(jsonPath("$.componentKey").value(DEFAULT_COMPONENT_KEY.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.qualifier").value(DEFAULT_QUALIFIER.toString()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSonarComponent() throws Exception {
        // Get the sonarComponent
        restSonarComponentMockMvc.perform(get("/api/sonar-components/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSonarComponent() throws Exception {
        // Initialize the database
        sonarComponentRepository.saveAndFlush(sonarComponent);

        int databaseSizeBeforeUpdate = sonarComponentRepository.findAll().size();

        // Update the sonarComponent
        SonarComponent updatedSonarComponent = sonarComponentRepository.findById(sonarComponent.getId()).get();
        // Disconnect from session so that the updates on updatedSonarComponent are not directly saved in db
        em.detach(updatedSonarComponent);
        updatedSonarComponent
            .organization(UPDATED_ORGANIZATION)
            .componentId(UPDATED_COMPONENT_ID)
            .componentKey(UPDATED_COMPONENT_KEY)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .qualifier(UPDATED_QUALIFIER)
            .path(UPDATED_PATH);

        restSonarComponentMockMvc.perform(put("/api/sonar-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSonarComponent)))
            .andExpect(status().isOk());

        // Validate the SonarComponent in the database
        List<SonarComponent> sonarComponentList = sonarComponentRepository.findAll();
        assertThat(sonarComponentList).hasSize(databaseSizeBeforeUpdate);
        SonarComponent testSonarComponent = sonarComponentList.get(sonarComponentList.size() - 1);
        assertThat(testSonarComponent.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testSonarComponent.getComponentId()).isEqualTo(UPDATED_COMPONENT_ID);
        assertThat(testSonarComponent.getComponentKey()).isEqualTo(UPDATED_COMPONENT_KEY);
        assertThat(testSonarComponent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSonarComponent.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSonarComponent.getQualifier()).isEqualTo(UPDATED_QUALIFIER);
        assertThat(testSonarComponent.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingSonarComponent() throws Exception {
        int databaseSizeBeforeUpdate = sonarComponentRepository.findAll().size();

        // Create the SonarComponent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSonarComponentMockMvc.perform(put("/api/sonar-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sonarComponent)))
            .andExpect(status().isBadRequest());

        // Validate the SonarComponent in the database
        List<SonarComponent> sonarComponentList = sonarComponentRepository.findAll();
        assertThat(sonarComponentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSonarComponent() throws Exception {
        // Initialize the database
        sonarComponentRepository.saveAndFlush(sonarComponent);

        int databaseSizeBeforeDelete = sonarComponentRepository.findAll().size();

        // Get the sonarComponent
        restSonarComponentMockMvc.perform(delete("/api/sonar-components/{id}", sonarComponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SonarComponent> sonarComponentList = sonarComponentRepository.findAll();
        assertThat(sonarComponentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SonarComponent.class);
        SonarComponent sonarComponent1 = new SonarComponent();
        sonarComponent1.setId(1L);
        SonarComponent sonarComponent2 = new SonarComponent();
        sonarComponent2.setId(sonarComponent1.getId());
        assertThat(sonarComponent1).isEqualTo(sonarComponent2);
        sonarComponent2.setId(2L);
        assertThat(sonarComponent1).isNotEqualTo(sonarComponent2);
        sonarComponent1.setId(null);
        assertThat(sonarComponent1).isNotEqualTo(sonarComponent2);
    }
}
