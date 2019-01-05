package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.JenkinsJob;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JenkinsJob entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JenkinsJobRepository extends JpaRepository<JenkinsJob, Long> {

}
