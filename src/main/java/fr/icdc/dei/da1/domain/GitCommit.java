package fr.icdc.dei.da1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A GitCommit.
 */
@Entity
@Table(name = "git_commit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GitCommit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_hash")
    private String hash;

    @Column(name = "commit_date")
    private ZonedDateTime commitDate;

    @Column(name = "message")
    private String message;

    @Column(name = "branch")
    private String branch;

    @ManyToOne
    @JsonIgnoreProperties("commits")
    private GitRepo gitRepo;

    @ManyToOne
    @JsonIgnoreProperties("")
    private GitCommit parent;

    @ManyToOne
    @JsonIgnoreProperties("")
    private GitCommitter committer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHash() {
        return hash;
    }

    public GitCommit hash(String hash) {
        this.hash = hash;
        return this;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public ZonedDateTime getCommitDate() {
        return commitDate;
    }

    public GitCommit commitDate(ZonedDateTime commitDate) {
        this.commitDate = commitDate;
        return this;
    }

    public void setCommitDate(ZonedDateTime commitDate) {
        this.commitDate = commitDate;
    }

    public String getMessage() {
        return message;
    }

    public GitCommit message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getBranch() {
        return branch;
    }

    public GitCommit branch(String branch) {
        this.branch = branch;
        return this;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public GitRepo getGitRepo() {
        return gitRepo;
    }

    public GitCommit gitRepo(GitRepo gitRepo) {
        this.gitRepo = gitRepo;
        return this;
    }

    public void setGitRepo(GitRepo gitRepo) {
        this.gitRepo = gitRepo;
    }

    public GitCommit getParent() {
        return parent;
    }

    public GitCommit parent(GitCommit gitCommit) {
        this.parent = gitCommit;
        return this;
    }

    public void setParent(GitCommit gitCommit) {
        this.parent = gitCommit;
    }

    public GitCommitter getCommitter() {
        return committer;
    }

    public GitCommit committer(GitCommitter gitCommitter) {
        this.committer = gitCommitter;
        return this;
    }

    public void setCommitter(GitCommitter gitCommitter) {
        this.committer = gitCommitter;
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
        GitCommit gitCommit = (GitCommit) o;
        if (gitCommit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gitCommit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GitCommit{" +
            "id=" + getId() +
            ", hash='" + getHash() + "'" +
            ", commitDate='" + getCommitDate() + "'" +
            ", message='" + getMessage() + "'" +
            ", branch='" + getBranch() + "'" +
            "}";
    }
}
