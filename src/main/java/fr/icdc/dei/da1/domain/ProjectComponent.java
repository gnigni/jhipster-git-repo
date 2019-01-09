package fr.icdc.dei.da1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.icdc.dei.da1.domain.enumeration.ComponentType;

/**
 * A ProjectComponent.
 */
@Entity
@Table(name = "project_component")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProjectComponent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ComponentType type;

    @ManyToOne
    @JsonIgnoreProperties("components")
    private Application application;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProjectComponent parent;

    @ManyToOne
    @JsonIgnoreProperties("projectComponents")
    private GitRepo gitRepo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ComponentType getType() {
        return type;
    }

    public ProjectComponent type(ComponentType type) {
        this.type = type;
        return this;
    }

    public void setType(ComponentType type) {
        this.type = type;
    }

    public Application getApplication() {
        return application;
    }

    public ProjectComponent application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public ProjectComponent getParent() {
        return parent;
    }

    public ProjectComponent parent(ProjectComponent projectComponent) {
        this.parent = projectComponent;
        return this;
    }

    public void setParent(ProjectComponent projectComponent) {
        this.parent = projectComponent;
    }

    public GitRepo getGitRepo() {
        return gitRepo;
    }

    public ProjectComponent gitRepo(GitRepo gitRepo) {
        this.gitRepo = gitRepo;
        return this;
    }

    public void setGitRepo(GitRepo gitRepo) {
        this.gitRepo = gitRepo;
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
        ProjectComponent projectComponent = (ProjectComponent) o;
        if (projectComponent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), projectComponent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProjectComponent{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
