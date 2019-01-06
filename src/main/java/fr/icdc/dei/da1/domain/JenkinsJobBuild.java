package fr.icdc.dei.da1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.icdc.dei.da1.domain.enumeration.JenkinsJobBuildState;

/**
 * A JenkinsJobBuild.
 */
@Entity
@Table(name = "jenkins_job_build")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JenkinsJobBuild implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "url")
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private JenkinsJobBuildState state;

    @ManyToOne
    @JsonIgnoreProperties("")
    private JenkinsJob jenkinsJob;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public JenkinsJobBuild url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public JenkinsJobBuildState getState() {
        return state;
    }

    public JenkinsJobBuild state(JenkinsJobBuildState state) {
        this.state = state;
        return this;
    }

    public void setState(JenkinsJobBuildState state) {
        this.state = state;
    }

    public JenkinsJob getJenkinsJob() {
        return jenkinsJob;
    }

    public JenkinsJobBuild jenkinsJob(JenkinsJob jenkinsJob) {
        this.jenkinsJob = jenkinsJob;
        return this;
    }

    public void setJenkinsJob(JenkinsJob jenkinsJob) {
        this.jenkinsJob = jenkinsJob;
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
        JenkinsJobBuild jenkinsJobBuild = (JenkinsJobBuild) o;
        if (jenkinsJobBuild.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jenkinsJobBuild.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JenkinsJobBuild{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", state='" + getState() + "'" +
            "}";
    }
}
