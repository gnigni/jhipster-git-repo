package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.GitCommit;
import fr.icdc.dei.da1.repository.GitCommitRepository;
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
 * REST controller for managing GitCommit.
 */
@RestController
@RequestMapping("/api")
public class GitCommitResource {

    private final Logger log = LoggerFactory.getLogger(GitCommitResource.class);

    private static final String ENTITY_NAME = "gitCommit";

    private final GitCommitRepository gitCommitRepository;

    public GitCommitResource(GitCommitRepository gitCommitRepository) {
        this.gitCommitRepository = gitCommitRepository;
    }

    /**
     * POST  /git-commits : Create a new gitCommit.
     *
     * @param gitCommit the gitCommit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gitCommit, or with status 400 (Bad Request) if the gitCommit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/git-commits")
    @Timed
    public ResponseEntity<GitCommit> createGitCommit(@RequestBody GitCommit gitCommit) throws URISyntaxException {
        log.debug("REST request to save GitCommit : {}", gitCommit);
        if (gitCommit.getId() != null) {
            throw new BadRequestAlertException("A new gitCommit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GitCommit result = gitCommitRepository.save(gitCommit);
        return ResponseEntity.created(new URI("/api/git-commits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /git-commits : Updates an existing gitCommit.
     *
     * @param gitCommit the gitCommit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gitCommit,
     * or with status 400 (Bad Request) if the gitCommit is not valid,
     * or with status 500 (Internal Server Error) if the gitCommit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/git-commits")
    @Timed
    public ResponseEntity<GitCommit> updateGitCommit(@RequestBody GitCommit gitCommit) throws URISyntaxException {
        log.debug("REST request to update GitCommit : {}", gitCommit);
        if (gitCommit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GitCommit result = gitCommitRepository.save(gitCommit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gitCommit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /git-commits : get all the gitCommits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gitCommits in body
     */
    @GetMapping("/git-commits")
    @Timed
    public List<GitCommit> getAllGitCommits() {
        log.debug("REST request to get all GitCommits");
        return gitCommitRepository.findAll();
    }

    /**
     * GET  /git-commits/:id : get the "id" gitCommit.
     *
     * @param id the id of the gitCommit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gitCommit, or with status 404 (Not Found)
     */
    @GetMapping("/git-commits/{id}")
    @Timed
    public ResponseEntity<GitCommit> getGitCommit(@PathVariable Long id) {
        log.debug("REST request to get GitCommit : {}", id);
        Optional<GitCommit> gitCommit = gitCommitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gitCommit);
    }

    /**
     * DELETE  /git-commits/:id : delete the "id" gitCommit.
     *
     * @param id the id of the gitCommit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/git-commits/{id}")
    @Timed
    public ResponseEntity<Void> deleteGitCommit(@PathVariable Long id) {
        log.debug("REST request to delete GitCommit : {}", id);

        gitCommitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
