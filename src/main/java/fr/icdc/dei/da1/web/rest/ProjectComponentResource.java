package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.ProjectComponent;
import fr.icdc.dei.da1.repository.ProjectComponentRepository;
import fr.icdc.dei.da1.web.rest.errors.BadRequestAlertException;
import fr.icdc.dei.da1.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProjectComponent.
 */
@RestController
@RequestMapping("/api")
public class ProjectComponentResource {

    private final Logger log = LoggerFactory.getLogger(ProjectComponentResource.class);

    private static final String ENTITY_NAME = "projectComponent";

    private final ProjectComponentRepository projectComponentRepository;

    public ProjectComponentResource(ProjectComponentRepository projectComponentRepository) {
        this.projectComponentRepository = projectComponentRepository;
    }

    /**
     * POST  /project-components : Create a new projectComponent.
     *
     * @param projectComponent the projectComponent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new projectComponent, or with status 400 (Bad Request) if the projectComponent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/project-components")
    @Timed
    public ResponseEntity<ProjectComponent> createProjectComponent(@RequestBody ProjectComponent projectComponent) throws URISyntaxException {
        log.debug("REST request to save ProjectComponent : {}", projectComponent);
        if (projectComponent.getId() != null) {
            throw new BadRequestAlertException("A new projectComponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectComponent result = projectComponentRepository.save(projectComponent);
        return ResponseEntity.created(new URI("/api/project-components/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /project-components : Updates an existing projectComponent.
     *
     * @param projectComponent the projectComponent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated projectComponent,
     * or with status 400 (Bad Request) if the projectComponent is not valid,
     * or with status 500 (Internal Server Error) if the projectComponent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/project-components")
    @Timed
    public ResponseEntity<ProjectComponent> updateProjectComponent(@RequestBody ProjectComponent projectComponent) throws URISyntaxException {
        log.debug("REST request to update ProjectComponent : {}", projectComponent);
        if (projectComponent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProjectComponent result = projectComponentRepository.save(projectComponent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projectComponent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /project-components : get all the projectComponents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of projectComponents in body
     */
    @GetMapping("/project-components")
    @Timed
    public List<ProjectComponent> getAllProjectComponents() {
        log.debug("REST request to get all ProjectComponents");
        return projectComponentRepository.findAll();
    }

    /**
     * GET  /project-components/:id : get the "id" projectComponent.
     *
     * @param id the id of the projectComponent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the projectComponent, or with status 404 (Not Found)
     */
    @GetMapping("/project-components/{id}")
    @Timed
    public ResponseEntity<ProjectComponent> getProjectComponent(@PathVariable Long id) {
        log.debug("REST request to get ProjectComponent : {}", id);
        Optional<ProjectComponent> projectComponent = projectComponentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(projectComponent);
    }

    /**
     * DELETE  /project-components/:id : delete the "id" projectComponent.
     *
     * @param id the id of the projectComponent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/project-components/{id}")
    @Timed
    public ResponseEntity<Void> deleteProjectComponent(@PathVariable Long id) {
        log.debug("REST request to delete ProjectComponent : {}", id);

        projectComponentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
