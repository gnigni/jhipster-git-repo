package fr.icdc.dei.da1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.icdc.dei.da1.domain.enumeration.JenkinsJobType;

/**
 * A JenkinsJob.
 */
@Entity
@Table(name = "jenkins_job")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JenkinsJob implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "url")
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private JenkinsJobType type;

    @OneToOne    @JoinColumn(unique = true)
    private JenkinsFolder jenkinsFolder;

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

    public JenkinsJob url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public JenkinsJobType getType() {
        return type;
    }

    public JenkinsJob type(JenkinsJobType type) {
        this.type = type;
        return this;
    }

    public void setType(JenkinsJobType type) {
        this.type = type;
    }

    public JenkinsFolder getJenkinsFolder() {
        return jenkinsFolder;
    }

    public JenkinsJob jenkinsFolder(JenkinsFolder jenkinsFolder) {
        this.jenkinsFolder = jenkinsFolder;
        return this;
    }

    public void setJenkinsFolder(JenkinsFolder jenkinsFolder) {
        this.jenkinsFolder = jenkinsFolder;
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
        JenkinsJob jenkinsJob = (JenkinsJob) o;
        if (jenkinsJob.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jenkinsJob.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JenkinsJob{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
