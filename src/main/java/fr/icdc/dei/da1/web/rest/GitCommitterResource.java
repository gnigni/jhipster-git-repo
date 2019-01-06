package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.GitCommitter;
import fr.icdc.dei.da1.repository.GitCommitterRepository;
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
 * REST controller for managing GitCommitter.
 */
@RestController
@RequestMapping("/api")
public class GitCommitterResource {

    private final Logger log = LoggerFactory.getLogger(GitCommitterResource.class);

    private static final String ENTITY_NAME = "gitCommitter";

    private final GitCommitterRepository gitCommitterRepository;

    public GitCommitterResource(GitCommitterRepository gitCommitterRepository) {
        this.gitCommitterRepository = gitCommitterRepository;
    }

    /**
     * POST  /git-committers : Create a new gitCommitter.
     *
     * @param gitCommitter the gitCommitter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gitCommitter, or with status 400 (Bad Request) if the gitCommitter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/git-committers")
    @Timed
    public ResponseEntity<GitCommitter> createGitCommitter(@RequestBody GitCommitter gitCommitter) throws URISyntaxException {
        log.debug("REST request to save GitCommitter : {}", gitCommitter);
        if (gitCommitter.getId() != null) {
            throw new BadRequestAlertException("A new gitCommitter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GitCommitter result = gitCommitterRepository.save(gitCommitter);
        return ResponseEntity.created(new URI("/api/git-committers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /git-committers : Updates an existing gitCommitter.
     *
     * @param gitCommitter the gitCommitter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gitCommitter,
     * or with status 400 (Bad Request) if the gitCommitter is not valid,
     * or with status 500 (Internal Server Error) if the gitCommitter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/git-committers")
    @Timed
    public ResponseEntity<GitCommitter> updateGitCommitter(@RequestBody GitCommitter gitCommitter) throws URISyntaxException {
        log.debug("REST request to update GitCommitter : {}", gitCommitter);
        if (gitCommitter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GitCommitter result = gitCommitterRepository.save(gitCommitter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gitCommitter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /git-committers : get all the gitCommitters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gitCommitters in body
     */
    @GetMapping("/git-committers")
    @Timed
    public List<GitCommitter> getAllGitCommitters() {
        log.debug("REST request to get all GitCommitters");
        return gitCommitterRepository.findAll();
    }

    /**
     * GET  /git-committers/:id : get the "id" gitCommitter.
     *
     * @param id the id of the gitCommitter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gitCommitter, or with status 404 (Not Found)
     */
    @GetMapping("/git-committers/{id}")
    @Timed
    public ResponseEntity<GitCommitter> getGitCommitter(@PathVariable Long id) {
        log.debug("REST request to get GitCommitter : {}", id);
        Optional<GitCommitter> gitCommitter = gitCommitterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gitCommitter);
    }

    /**
     * DELETE  /git-committers/:id : delete the "id" gitCommitter.
     *
     * @param id the id of the gitCommitter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/git-committers/{id}")
    @Timed
    public ResponseEntity<Void> deleteGitCommitter(@PathVariable Long id) {
        log.debug("REST request to delete GitCommitter : {}", id);

        gitCommitterRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
