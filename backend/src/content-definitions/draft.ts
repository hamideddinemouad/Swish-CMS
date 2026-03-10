// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EntityManager, Repository } from 'typeorm';
// import { CreateContentDefinitionDto } from './dto/create-content-definition.dto';
// import { UpdateContentDefinitionDto } from './dto/update-content-definition.dto';
// import { ContentDefinition } from './entities/content-definition.entity';
// import dataSource from 'src/data-source';

// @Injectable()
// export class ContentDefinitionsService {
//   constructor(
//     @InjectRepository(ContentDefinition)
//     private readonly contentDefinitionsRepository: Repository<ContentDefinition>,
//     // 1. Inject the DataSource here
//     private readonly entityManager : EntityManager
//   ) {}

//   async findAll(): Promise<ContentDefinition[]> {
//     const tenantId = 'some-tenant-id'; // Usually retrieved from a Request context

//     // 2. Wrap everything in a transaction
//     return await this.dataSource.transaction(async (manager) => {
      
//       // 3. Set the tenant ID on this specific transaction connection
//       await manager.query(`SET LOCAL app.tenant_id = '${tenantId}'`);

//       // 4. Use the 'manager' to find, NOT the 'contentDefinitionsRepository'
//       // This ensures the query stays on the connection where you set the ID
//       return await manager.find(ContentDefinition);
//     });
//   }

//   // Example of 'create' using the same pattern
//   async create(dto: CreateContentDefinitionDto): Promise<ContentDefinition> {
//     const tenantId = 'some-tenant-id';

//     return await this.dataSource.transaction(async (manager) => {
//       await manager.query(`SET LOCAL app.tenant_id = '${tenantId}'`);
      
//       const newEntity = manager.create(ContentDefinition, dto);
//       return await manager.save(newEntity);
//     });
//   }
// }

