package com.github.leandrohsilveira.systock.config;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;

import com.github.leandrohsilveira.systock.domain.AbstractDomain;

@Component
public class ResourceProcessorComponent implements ResourceProcessor<Resource<? extends AbstractDomain>> {

	private static final Logger logger = LoggerFactory.getLogger(ResourceProcessorComponent.class);
	
	@Override
	public Resource<? extends AbstractDomain> process(Resource<? extends AbstractDomain> resource) {
			
		new ArrayList<>(resource.getLinks()).forEach(link -> {
			if(!link.isTemplated()) {
				try {
					URL url = new URL(link.getHref());
					String href = url.getPath().replace("/api", "");
					
					resource.add(new Link(href, String.format("app_%s", link.getRel())));
					
				} catch (MalformedURLException e) {
					logger.error(e.getMessage(), e);
				}
			}
		});
		
		return resource;
	}

}
