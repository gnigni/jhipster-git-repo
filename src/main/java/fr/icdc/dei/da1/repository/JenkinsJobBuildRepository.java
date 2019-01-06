package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.JenkinsJobBuild;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JenkinsJobBuild entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JenkinsJobBuildRepository extends JpaRepository<JenkinsJobBuild, Long> {

}
