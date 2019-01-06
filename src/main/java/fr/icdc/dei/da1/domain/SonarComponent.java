package fr.icdc.dei.da1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.icdc.dei.da1.domain.enumeration.SonarQualifier;

/**
 * A SonarComponent.
 */
@Entity
@Table(name = "sonar_component")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SonarComponent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_organization")
    private String organization;

    @Column(name = "component_id")
    private String componentId;

    @Column(name = "component_key")
    private String componentKey;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "qualifier")
    private SonarQualifier qualifier;

    @Column(name = "path")
    private String path;

    @OneToOne    @JoinColumn(unique = true)
    private ProjectComponent component;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganization() {
        return organization;
    }

    public SonarComponent organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getComponentId() {
        return componentId;
    }

    public SonarComponent componentId(String componentId) {
        this.componentId = componentId;
        return this;
    }

    public void setComponentId(String componentId) {
        this.componentId = componentId;
    }

    public String getComponentKey() {
        return componentKey;
    }

    public SonarComponent componentKey(String componentKey) {
        this.componentKey = componentKey;
        return this;
    }

    public void setComponentKey(String componentKey) {
        this.componentKey = componentKey;
    }

    public String getName() {
        return name;
    }

    public SonarComponent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public SonarComponent description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SonarQualifier getQualifier() {
        return qualifier;
    }

    public SonarComponent qualifier(SonarQualifier qualifier) {
        this.qualifier = qualifier;
        return this;
    }

    public void setQualifier(SonarQualifier qualifier) {
        this.qualifier = qualifier;
    }

    public String getPath() {
        return path;
    }

    public SonarComponent path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public ProjectComponent getComponent() {
        return component;
    }

    public SonarComponent component(ProjectComponent projectComponent) {
        this.component = projectComponent;
        return this;
    }

    public void setComponent(ProjectComponent projectComponent) {
        this.component = projectComponent;
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
        SonarComponent sonarComponent = (SonarComponent) o;
        if (sonarComponent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sonarComponent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SonarComponent{" +
            "id=" + getId() +
            ", organization='" + getOrganization() + "'" +
            ", componentId='" + getComponentId() + "'" +
            ", componentKey='" + getComponentKey() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", qualifier='" + getQualifier() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
