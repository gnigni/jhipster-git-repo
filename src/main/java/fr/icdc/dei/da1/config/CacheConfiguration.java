package fr.icdc.dei.da1.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(fr.icdc.dei.da1.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.Application.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.Application.class.getName() + ".components", jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.ProjectComponent.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.GitRepo.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.GitRepo.class.getName() + ".components", jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.GitRepo.class.getName() + ".commits", jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.GitCommit.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.GitCommitter.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.SonarComponent.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.JenkinsFolder.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.JenkinsJob.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.JenkinsJobBuild.class.getName(), jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.Application.class.getName() + ".gitRepos", jcacheConfiguration);
            cm.createCache(fr.icdc.dei.da1.domain.GitRepo.class.getName() + ".projectComponents", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
