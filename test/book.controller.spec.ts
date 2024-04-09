import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from 'src/application/interfaces/BookController';
import { BookService } from 'src/application/services/book.service';

describe('BookController', () => {
  let controller: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            addNewBook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a book', async () => {
    const bookDto = { title: 'Test Book', author: 'Test Author' };
    const book = { id: 1, ...bookDto };
    jest.spyOn(bookService, 'addNewBook').mockResolvedValue(book);
    await expect(controller.addBook(bookDto)).resolves.toEqual(book);
    expect(bookService.addNewBook).toHaveBeenCalledWith(
      bookDto.title,
      bookDto.author,
    );
  });
});
