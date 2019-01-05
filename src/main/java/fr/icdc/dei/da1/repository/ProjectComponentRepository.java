package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.ProjectComponent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProjectComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectComponentRepository extends JpaRepository<ProjectComponent, Long> {

}
