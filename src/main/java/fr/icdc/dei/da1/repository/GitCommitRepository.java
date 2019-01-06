package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.GitCommit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GitCommit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GitCommitRepository extends JpaRepository<GitCommit, Long> {

}
