package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.SonarComponent;
import fr.icdc.dei.da1.repository.SonarComponentRepository;
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
 * REST controller for managing SonarComponent.
 */
@RestController
@RequestMapping("/api")
public class SonarComponentResource {

    private final Logger log = LoggerFactory.getLogger(SonarComponentResource.class);

    private static final String ENTITY_NAME = "sonarComponent";

    private final SonarComponentRepository sonarComponentRepository;

    public SonarComponentResource(SonarComponentRepository sonarComponentRepository) {
        this.sonarComponentRepository = sonarComponentRepository;
    }

    /**
     * POST  /sonar-components : Create a new sonarComponent.
     *
     * @param sonarComponent the sonarComponent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sonarComponent, or with status 400 (Bad Request) if the sonarComponent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sonar-components")
    @Timed
    public ResponseEntity<SonarComponent> createSonarComponent(@RequestBody SonarComponent sonarComponent) throws URISyntaxException {
        log.debug("REST request to save SonarComponent : {}", sonarComponent);
        if (sonarComponent.getId() != null) {
            throw new BadRequestAlertException("A new sonarComponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SonarComponent result = sonarComponentRepository.save(sonarComponent);
        return ResponseEntity.created(new URI("/api/sonar-components/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sonar-components : Updates an existing sonarComponent.
     *
     * @param sonarComponent the sonarComponent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sonarComponent,
     * or with status 400 (Bad Request) if the sonarComponent is not valid,
     * or with status 500 (Internal Server Error) if the sonarComponent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sonar-components")
    @Timed
    public ResponseEntity<SonarComponent> updateSonarComponent(@RequestBody SonarComponent sonarComponent) throws URISyntaxException {
        log.debug("REST request to update SonarComponent : {}", sonarComponent);
        if (sonarComponent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SonarComponent result = sonarComponentRepository.save(sonarComponent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sonarComponent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sonar-components : get all the sonarComponents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sonarComponents in body
     */
    @GetMapping("/sonar-components")
    @Timed
    public List<SonarComponent> getAllSonarComponents() {
        log.debug("REST request to get all SonarComponents");
        return sonarComponentRepository.findAll();
    }

    /**
     * GET  /sonar-components/:id : get the "id" sonarComponent.
     *
     * @param id the id of the sonarComponent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sonarComponent, or with status 404 (Not Found)
     */
    @GetMapping("/sonar-components/{id}")
    @Timed
    public ResponseEntity<SonarComponent> getSonarComponent(@PathVariable Long id) {
        log.debug("REST request to get SonarComponent : {}", id);
        Optional<SonarComponent> sonarComponent = sonarComponentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sonarComponent);
    }

    /**
     * DELETE  /sonar-components/:id : delete the "id" sonarComponent.
     *
     * @param id the id of the sonarComponent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sonar-components/{id}")
    @Timed
    public ResponseEntity<Void> deleteSonarComponent(@PathVariable Long id) {
        log.debug("REST request to delete SonarComponent : {}", id);

        sonarComponentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
