package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.JenkinsFolder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JenkinsFolder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JenkinsFolderRepository extends JpaRepository<JenkinsFolder, Long> {

}
