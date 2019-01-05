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
 * A GitRepo.
 */
@Entity
@Table(name = "git_repo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GitRepo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "local_path")
    private String localPath;

    @Column(name = "remote_url")
    private String remoteUrl;

    @OneToMany(mappedBy = "gitRepo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProjectComponent> components = new HashSet<>();
    @OneToMany(mappedBy = "gitRepo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GitCommit> commits = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocalPath() {
        return localPath;
    }

    public GitRepo localPath(String localPath) {
        this.localPath = localPath;
        return this;
    }

    public void setLocalPath(String localPath) {
        this.localPath = localPath;
    }

    public String getRemoteUrl() {
        return remoteUrl;
    }

    public GitRepo remoteUrl(String remoteUrl) {
        this.remoteUrl = remoteUrl;
        return this;
    }

    public void setRemoteUrl(String remoteUrl) {
        this.remoteUrl = remoteUrl;
    }

    public Set<ProjectComponent> getComponents() {
        return components;
    }

    public GitRepo components(Set<ProjectComponent> projectComponents) {
        this.components = projectComponents;
        return this;
    }

    public GitRepo addComponent(ProjectComponent projectComponent) {
        this.components.add(projectComponent);
        projectComponent.setGitRepo(this);
        return this;
    }

    public GitRepo removeComponent(ProjectComponent projectComponent) {
        this.components.remove(projectComponent);
        projectComponent.setGitRepo(null);
        return this;
    }

    public void setComponents(Set<ProjectComponent> projectComponents) {
        this.components = projectComponents;
    }

    public Set<GitCommit> getCommits() {
        return commits;
    }

    public GitRepo commits(Set<GitCommit> gitCommits) {
        this.commits = gitCommits;
        return this;
    }

    public GitRepo addCommit(GitCommit gitCommit) {
        this.commits.add(gitCommit);
        gitCommit.setGitRepo(this);
        return this;
    }

    public GitRepo removeCommit(GitCommit gitCommit) {
        this.commits.remove(gitCommit);
        gitCommit.setGitRepo(null);
        return this;
    }

    public void setCommits(Set<GitCommit> gitCommits) {
        this.commits = gitCommits;
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
        GitRepo gitRepo = (GitRepo) o;
        if (gitRepo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gitRepo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GitRepo{" +
            "id=" + getId() +
            ", localPath='" + getLocalPath() + "'" +
            ", remoteUrl='" + getRemoteUrl() + "'" +
            "}";
    }
}
