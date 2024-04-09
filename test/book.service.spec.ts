import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { BookService } from '../src/application/services/BookService';
import { Book } from '../src/domain/entities/Book';

describe('BookService', () => {
  let service: BookService;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: EntityManager,
          useValue: {
            persistAndFlush: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new book', async () => {
    const book = new Book('Test Book', 'Test Author');
    jest.spyOn(em, 'persistAndFlush').mockResolvedValue(undefined);
    await expect(service.addNewBook('Test Book', 'Test Author')).resolves.toEqual(book);
    expect(em.persistAndFlush).toHaveBeenCalledWith(book);
  });
});
