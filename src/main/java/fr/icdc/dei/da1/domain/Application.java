package fr.icdc.dei.da1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code_application")
    private String codeApplication;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "application")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProjectComponent> components = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeApplication() {
        return codeApplication;
    }

    public Application codeApplication(String codeApplication) {
        this.codeApplication = codeApplication;
        return this;
    }

    public void setCodeApplication(String codeApplication) {
        this.codeApplication = codeApplication;
    }

    public String getDescription() {
        return description;
    }

    public Application description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ProjectComponent> getComponents() {
        return components;
    }

    public Application components(Set<ProjectComponent> projectComponents) {
        this.components = projectComponents;
        return this;
    }

    public Application addComponent(ProjectComponent projectComponent) {
        this.components.add(projectComponent);
        projectComponent.setApplication(this);
        return this;
    }

    public Application removeComponent(ProjectComponent projectComponent) {
        this.components.remove(projectComponent);
        projectComponent.setApplication(null);
        return this;
    }

    public void setComponents(Set<ProjectComponent> projectComponents) {
        this.components = projectComponents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Application application = (Application) o;
        if (application.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), application.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", codeApplication='" + getCodeApplication() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
