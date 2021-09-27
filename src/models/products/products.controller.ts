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
  Res
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';




@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateOne(id, updateProductsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return this.productsService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cost-report')
  async costReport(): Promise<Product[]> {
    return await this.productsService.getCostReport();
  }


  @UseGuards(JwtAuthGuard)
  @Get('/available/:id')
  async productAvailable(@Param('id') id: string): Promise<Boolean> {
    return await this.productsService.productAvailable(id);
  }

  //File Upload Section
  @UseGuards(JwtAuthGuard)
  @Post('/upload-image/:id')
  @UseInterceptors(
    FileInterceptor('product-image', { dest: './images/' })
  )
  async uploadPicture(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Product> {
    return this.productsService.uploadProductPicture(id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('upload-image/:id')
  async getProductPicture(@Param('id') id: string, @Res() res) {
    const product = await this.productsService.findOne(id);
    return res.sendFile(product.image_file_name, { root: 'images' })
  }
}
