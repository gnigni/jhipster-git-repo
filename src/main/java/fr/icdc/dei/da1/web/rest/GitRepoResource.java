package fr.icdc.dei.da1.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.icdc.dei.da1.domain.GitRepo;
import fr.icdc.dei.da1.repository.GitRepoRepository;
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
 * REST controller for managing GitRepo.
 */
@RestController
@RequestMapping("/api")
public class GitRepoResource {

    private final Logger log = LoggerFactory.getLogger(GitRepoResource.class);

    private static final String ENTITY_NAME = "gitRepo";

    private final GitRepoRepository gitRepoRepository;

    public GitRepoResource(GitRepoRepository gitRepoRepository) {
        this.gitRepoRepository = gitRepoRepository;
    }

    /**
     * POST  /git-repos : Create a new gitRepo.
     *
     * @param gitRepo the gitRepo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gitRepo, or with status 400 (Bad Request) if the gitRepo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/git-repos")
    @Timed
    public ResponseEntity<GitRepo> createGitRepo(@RequestBody GitRepo gitRepo) throws URISyntaxException {
        log.debug("REST request to save GitRepo : {}", gitRepo);
        if (gitRepo.getId() != null) {
            throw new BadRequestAlertException("A new gitRepo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GitRepo result = gitRepoRepository.save(gitRepo);
        return ResponseEntity.created(new URI("/api/git-repos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /git-repos : Updates an existing gitRepo.
     *
     * @param gitRepo the gitRepo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gitRepo,
     * or with status 400 (Bad Request) if the gitRepo is not valid,
     * or with status 500 (Internal Server Error) if the gitRepo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/git-repos")
    @Timed
    public ResponseEntity<GitRepo> updateGitRepo(@RequestBody GitRepo gitRepo) throws URISyntaxException {
        log.debug("REST request to update GitRepo : {}", gitRepo);
        if (gitRepo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GitRepo result = gitRepoRepository.save(gitRepo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gitRepo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /git-repos : get all the gitRepos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gitRepos in body
     */
    @GetMapping("/git-repos")
    @Timed
    public List<GitRepo> getAllGitRepos() {
        log.debug("REST request to get all GitRepos");
        return gitRepoRepository.findAll();
    }

    /**
     * GET  /git-repos/:id : get the "id" gitRepo.
     *
     * @param id the id of the gitRepo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gitRepo, or with status 404 (Not Found)
     */
    @GetMapping("/git-repos/{id}")
    @Timed
    public ResponseEntity<GitRepo> getGitRepo(@PathVariable Long id) {
        log.debug("REST request to get GitRepo : {}", id);
        Optional<GitRepo> gitRepo = gitRepoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gitRepo);
    }

    /**
     * DELETE  /git-repos/:id : delete the "id" gitRepo.
     *
     * @param id the id of the gitRepo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/git-repos/{id}")
    @Timed
    public ResponseEntity<Void> deleteGitRepo(@PathVariable Long id) {
        log.debug("REST request to delete GitRepo : {}", id);

        gitRepoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
