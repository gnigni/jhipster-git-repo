package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.GitRepo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GitRepo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GitRepoRepository extends JpaRepository<GitRepo, Long> {

}
