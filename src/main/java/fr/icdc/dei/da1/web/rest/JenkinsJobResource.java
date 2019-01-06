package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.JenkinsJob;
import fr.icdc.dei.da1.repository.JenkinsJobRepository;
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
 * REST controller for managing JenkinsJob.
 */
@RestController
@RequestMapping("/api")
public class JenkinsJobResource {

    private final Logger log = LoggerFactory.getLogger(JenkinsJobResource.class);

    private static final String ENTITY_NAME = "jenkinsJob";

    private final JenkinsJobRepository jenkinsJobRepository;

    public JenkinsJobResource(JenkinsJobRepository jenkinsJobRepository) {
        this.jenkinsJobRepository = jenkinsJobRepository;
    }

    /**
     * POST  /jenkins-jobs : Create a new jenkinsJob.
     *
     * @param jenkinsJob the jenkinsJob to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jenkinsJob, or with status 400 (Bad Request) if the jenkinsJob has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jenkins-jobs")
    @Timed
    public ResponseEntity<JenkinsJob> createJenkinsJob(@RequestBody JenkinsJob jenkinsJob) throws URISyntaxException {
        log.debug("REST request to save JenkinsJob : {}", jenkinsJob);
        if (jenkinsJob.getId() != null) {
            throw new BadRequestAlertException("A new jenkinsJob cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JenkinsJob result = jenkinsJobRepository.save(jenkinsJob);
        return ResponseEntity.created(new URI("/api/jenkins-jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jenkins-jobs : Updates an existing jenkinsJob.
     *
     * @param jenkinsJob the jenkinsJob to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jenkinsJob,
     * or with status 400 (Bad Request) if the jenkinsJob is not valid,
     * or with status 500 (Internal Server Error) if the jenkinsJob couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jenkins-jobs")
    @Timed
    public ResponseEntity<JenkinsJob> updateJenkinsJob(@RequestBody JenkinsJob jenkinsJob) throws URISyntaxException {
        log.debug("REST request to update JenkinsJob : {}", jenkinsJob);
        if (jenkinsJob.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JenkinsJob result = jenkinsJobRepository.save(jenkinsJob);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jenkinsJob.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jenkins-jobs : get all the jenkinsJobs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jenkinsJobs in body
     */
    @GetMapping("/jenkins-jobs")
    @Timed
    public List<JenkinsJob> getAllJenkinsJobs() {
        log.debug("REST request to get all JenkinsJobs");
        return jenkinsJobRepository.findAll();
    }

    /**
     * GET  /jenkins-jobs/:id : get the "id" jenkinsJob.
     *
     * @param id the id of the jenkinsJob to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jenkinsJob, or with status 404 (Not Found)
     */
    @GetMapping("/jenkins-jobs/{id}")
    @Timed
    public ResponseEntity<JenkinsJob> getJenkinsJob(@PathVariable Long id) {
        log.debug("REST request to get JenkinsJob : {}", id);
        Optional<JenkinsJob> jenkinsJob = jenkinsJobRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jenkinsJob);
    }

    /**
     * DELETE  /jenkins-jobs/:id : delete the "id" jenkinsJob.
     *
     * @param id the id of the jenkinsJob to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jenkins-jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJenkinsJob(@PathVariable Long id) {
        log.debug("REST request to delete JenkinsJob : {}", id);

        jenkinsJobRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
