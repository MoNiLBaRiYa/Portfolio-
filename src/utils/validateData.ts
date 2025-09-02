import { portfolioData } from '@/data/portfolio';
import { validatePortfolioData } from './validation';

// Validate the portfolio data on import
export const validateData = () => {
  const validation = validatePortfolioData(portfolioData);

  if (!validation.isValid) {
    console.error('Portfolio data validation failed:');
    validation.errors.forEach(error => console.error(`- ${error}`));
    throw new Error('Invalid portfolio data structure');
  }

  console.log('✅ Portfolio data validation passed');
  return true;
};

// Run validation in development
if (process.env.NODE_ENV === 'development') {
  validateData();
}

export { portfolioData };
