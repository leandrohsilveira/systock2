package com.github.leandrohsilveira.systock.systock;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.github.fakemongo.Fongo;
import com.mongodb.MockMongoClient;
import com.mongodb.Mongo;

@Configuration
public class MongoTestConfiguration extends AbstractMongoConfiguration {
	
	@Override
	protected String getDatabaseName() {
		return "systockTestDb";
	}

	@Override
	public Mongo mongo() throws Exception {
		return new Fongo(getDatabaseName()).getMongo();
				
	}
	
}
