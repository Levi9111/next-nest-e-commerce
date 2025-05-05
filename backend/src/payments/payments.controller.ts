import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  createCheckoutDto,
  createCheckoutSchema,
} from './dto/create-checkout-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('checkout')
  @UsePipes(new ZodValidationPipe(createCheckoutSchema))
  createCheckout(@Body() dto: createCheckoutDto) {
    return this.paymentService.createCheckoutSession(dto);
  }
}
