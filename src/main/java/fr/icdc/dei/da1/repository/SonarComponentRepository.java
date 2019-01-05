package fr.icdc.dei.da1.repository;

import fr.icdc.dei.da1.domain.SonarComponent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SonarComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SonarComponentRepository extends JpaRepository<SonarComponent, Long> {

}
