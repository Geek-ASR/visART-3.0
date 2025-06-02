
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Eye, Terminal, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary mb-4" />,
    title: 'Build Fundamentals',
    description: 'Solidify your understanding with comprehensive theory on essential DSA concepts.',
  },
  {
    icon: <Eye className="h-10 w-10 text-primary mb-4" />,
    title: 'Interactive Visualizer',
    description: 'See algorithms in action. Input your data and watch how they process it step-by-step.',
  },
  {
    icon: <Terminal className="h-10 w-10 text-primary mb-4" />,
    title: 'In-Portal Coding',
    description: 'Solve DSA problems directly in our environment with real-time feedback on basic test cases.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey, track completed problems, and identify areas for improvement.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
