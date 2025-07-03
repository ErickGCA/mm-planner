import { Request, Response, NextFunction } from 'express';

export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'password';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export const validate = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];
    const data = req.body;

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];

      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} é obrigatório`);
        continue;
      }

      if (!rules.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      if (rules.type) {
        switch (rules.type) {
          case 'string':
            if (typeof value !== 'string') {
              errors.push(`${field} deve ser uma string`);
              continue;
            }
            break;
          case 'number':
            if (typeof value !== 'number' && isNaN(Number(value))) {
              errors.push(`${field} deve ser um número`);
              continue;
            }
            break;
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors.push(`${field} deve ser um email válido`);
              continue;
            }
            break;
          case 'password':
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value)) {
              errors.push(`${field} deve ter pelo menos 8 caracteres, 1 maiúscula, 1 minúscula e 1 número`);
              continue;
            }
            break;
        }
      }

      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} deve ter pelo menos ${rules.minLength} caracteres`);
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} deve ter no máximo ${rules.maxLength} caracteres`);
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${field} tem formato inválido`);
      }

      if (rules.custom) {
        const customResult = rules.custom(value);
        if (customResult !== true) {
          errors.push(typeof customResult === 'string' ? customResult : `${field} é inválido`);
        }
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ 
        message: 'Dados inválidos', 
        errors 
      });
      return;
    }

    next();
  };
};

export const registerSchema: ValidationSchema = {
  name: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
    custom: (value) => {
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
      return nameRegex.test(value) || 'Nome deve conter apenas letras';
    }
  },
  email: {
    required: true,
    type: 'email',
    maxLength: 255
  },
  password: {
    required: true,
    type: 'password'
  }
};

export const loginSchema: ValidationSchema = {
  email: {
    required: true,
    type: 'email'
  },
  password: {
    required: true,
    type: 'string',
    minLength: 1
  }
};

export const destinationSchema: ValidationSchema = {
  name: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 200
  },
  description: {
    required: false,
    type: 'string',
    maxLength: 1000
  },
  location: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 300
  },
  budget: {
    required: false,
    type: 'number',
    custom: (value) => {
      return value >= 0 || 'Orçamento deve ser um valor positivo';
    }
  },
  startDate: {
    required: false,
    type: 'string',
    custom: (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) || 'Data de início deve ser uma data válida';
    }
  },
  endDate: {
    required: false,
    type: 'string',
    custom: (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) || 'Data de fim deve ser uma data válida';
    }
  }
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

export const sanitizeInput = (data: any): any => {
  if (typeof data === 'string') {
    return sanitizeString(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeInput);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return data;
};
