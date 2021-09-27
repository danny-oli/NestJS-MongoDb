import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';



@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }


  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateOne(id, updateProductsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return this.productsService.deleteOne(id);
  }

  @Get('/available/:id')
  async productAvailable(@Param('id') id: string): Promise<Boolean> {
    return await this.productsService.productAvailable(id);
  }

  //File Upload Section
  @Post('/upload-image/:id')
  @UseInterceptors(
    FileInterceptor('product-image', { dest: './images/' })
  )
  async uploadPicture(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Product> {
    return this.productsService.uploadProductPicture(id, file);
  }


  @Get('upload-image/:id')
  async getProductPicture(@Param('id') id: string, @Res() res) {
    const product = await this.productsService.findOne(id);
    if (!product.image_file_name) throw new NotFoundException(`Image not found for this Product!`)
    return res.sendFile(product.image_file_name, { root: 'images' })
  }
}
