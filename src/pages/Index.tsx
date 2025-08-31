import { GeneratorPipeline } from '@/components/GeneratorPipeline';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Index = () => {
  return (
    <ErrorBoundary>
      <GeneratorPipeline />
    </ErrorBoundary>
  );
};

export default Index;
