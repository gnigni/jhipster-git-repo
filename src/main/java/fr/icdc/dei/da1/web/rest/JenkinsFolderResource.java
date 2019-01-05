package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.JenkinsFolder;
import fr.icdc.dei.da1.repository.JenkinsFolderRepository;
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
 * REST controller for managing JenkinsFolder.
 */
@RestController
@RequestMapping("/api")
public class JenkinsFolderResource {

    private final Logger log = LoggerFactory.getLogger(JenkinsFolderResource.class);

    private static final String ENTITY_NAME = "jenkinsFolder";

    private final JenkinsFolderRepository jenkinsFolderRepository;

    public JenkinsFolderResource(JenkinsFolderRepository jenkinsFolderRepository) {
        this.jenkinsFolderRepository = jenkinsFolderRepository;
    }

    /**
     * POST  /jenkins-folders : Create a new jenkinsFolder.
     *
     * @param jenkinsFolder the jenkinsFolder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jenkinsFolder, or with status 400 (Bad Request) if the jenkinsFolder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jenkins-folders")
    @Timed
    public ResponseEntity<JenkinsFolder> createJenkinsFolder(@RequestBody JenkinsFolder jenkinsFolder) throws URISyntaxException {
        log.debug("REST request to save JenkinsFolder : {}", jenkinsFolder);
        if (jenkinsFolder.getId() != null) {
            throw new BadRequestAlertException("A new jenkinsFolder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JenkinsFolder result = jenkinsFolderRepository.save(jenkinsFolder);
        return ResponseEntity.created(new URI("/api/jenkins-folders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jenkins-folders : Updates an existing jenkinsFolder.
     *
     * @param jenkinsFolder the jenkinsFolder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jenkinsFolder,
     * or with status 400 (Bad Request) if the jenkinsFolder is not valid,
     * or with status 500 (Internal Server Error) if the jenkinsFolder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jenkins-folders")
    @Timed
    public ResponseEntity<JenkinsFolder> updateJenkinsFolder(@RequestBody JenkinsFolder jenkinsFolder) throws URISyntaxException {
        log.debug("REST request to update JenkinsFolder : {}", jenkinsFolder);
        if (jenkinsFolder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JenkinsFolder result = jenkinsFolderRepository.save(jenkinsFolder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jenkinsFolder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jenkins-folders : get all the jenkinsFolders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jenkinsFolders in body
     */
    @GetMapping("/jenkins-folders")
    @Timed
    public List<JenkinsFolder> getAllJenkinsFolders() {
        log.debug("REST request to get all JenkinsFolders");
        return jenkinsFolderRepository.findAll();
    }

    /**
     * GET  /jenkins-folders/:id : get the "id" jenkinsFolder.
     *
     * @param id the id of the jenkinsFolder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jenkinsFolder, or with status 404 (Not Found)
     */
    @GetMapping("/jenkins-folders/{id}")
    @Timed
    public ResponseEntity<JenkinsFolder> getJenkinsFolder(@PathVariable Long id) {
        log.debug("REST request to get JenkinsFolder : {}", id);
        Optional<JenkinsFolder> jenkinsFolder = jenkinsFolderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jenkinsFolder);
    }

    /**
     * DELETE  /jenkins-folders/:id : delete the "id" jenkinsFolder.
     *
     * @param id the id of the jenkinsFolder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jenkins-folders/{id}")
    @Timed
    public ResponseEntity<Void> deleteJenkinsFolder(@PathVariable Long id) {
        log.debug("REST request to delete JenkinsFolder : {}", id);

        jenkinsFolderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
