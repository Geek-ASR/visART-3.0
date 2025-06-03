
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Eye, Terminal, TrendingUp, Youtube, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary mb-4" />,
    title: 'Build Fundamentals',
    description: 'Solidify your understanding with comprehensive theory on essential DSA concepts.',
    bgOpacityClass: 'bg-card/60',
  },
  {
    icon: <Eye className="h-10 w-10 text-primary mb-4" />,
    title: 'Interactive Visualizer',
    description: 'See algorithms in action. Input your data and watch how they process it step-by-step.',
    bgOpacityClass: 'bg-card/60',
  },
  {
    icon: <Terminal className="h-10 w-10 text-primary mb-4" />,
    title: 'In-Portal Coding',
    description: 'Solve DSA problems directly in our environment with real-time feedback on basic test cases.',
    bgOpacityClass: 'bg-card/60',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey, track completed problems, and identify areas for improvement.',
    bgOpacityClass: 'bg-card/60',
  },
  {
    icon: <Youtube className="h-10 w-10 text-primary mb-4" />,
    title: 'Video Explanation',
    description: 'Grasp complex topics easily with detailed video walkthroughs and expert insights.',
    bgOpacityClass: 'bg-card/30',
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary mb-4" />,
    title: 'Mentor for each domain',
    description: 'Get personalized guidance and support from experienced mentors in your chosen DSA field.',
    bgOpacityClass: 'bg-card/30',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={cn(
                "shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm border border-primary/20 hover:border-accent hover:scale-[1.02]",
                feature.bgOpacityClass
              )}
            >
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
