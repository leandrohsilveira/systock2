package com.github.leandrohsilveira.systock.systock;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

import com.github.fakemongo.Fongo;
import com.mongodb.Mongo;

@Configuration
public class MongoTestConfiguration extends AbstractMongoConfiguration {
	
	@Override
	public String getDatabaseName() {
		return "systockTestDb";
	}

	@Override
	public Mongo mongo() throws Exception {
		Fongo fongo = new Fongo(getDatabaseName());
		fongo.dropDatabase(getDatabaseName());
		return fongo.getMongo();
				
	}
	
}
