package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.GitCommitter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GitCommitter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GitCommitterRepository extends JpaRepository<GitCommitter, Long> {

}
