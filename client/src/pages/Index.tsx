import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Flame,
  Calendar,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Visual Progress Tracking",
      description:
        "GitHub-style heatmaps show your consistency at a glance. Watch your streaks grow.",
      color: "text-habit-productivity",
    },
    {
      icon: Flame,
      title: "Streak Motivation",
      description:
        "Build momentum with daily streaks. Never break the chain and watch your habits stick.",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Track completion rates and patterns. Understand what works for you.",
      color: "text-success",
    },
    {
      icon: Sparkles,
      title: "Beautiful & Simple",
      description:
        "Clean, Notion-inspired design that makes habit tracking a joy, not a chore.",
      color: "text-habit-mindfulness",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "1M+", label: "Habits Completed" },
    { value: "85%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center animate-slide-up">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              ✨ Build Better Habits, One Day at a Time
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Transform Your Life
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                One Habit at a Time
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              A beautiful, simple habit tracker. Track your daily habits,
              visualize your progress, and build lasting change.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/signup")}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-muted transition-all duration-300"
              >
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features wrapped in a simple, beautiful interface
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Simple Process, Powerful Results
            </h2>
            <p className="text-xl text-muted-foreground">
              Start building better habits in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Habits",
                description:
                  "Add habits you want to build. Choose from categories like Health, Productivity, and more.",
              },
              {
                step: "02",
                title: "Track Daily",
                description:
                  "Check off habits as you complete them. Watch your streaks grow day by day.",
              },
              {
                step: "03",
                title: "Visualize Progress",
                description:
                  "See your consistency with beautiful heatmaps. Celebrate your wins and stay motivated.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our community of habit builders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This app completely changed how I approach my daily routine. The visual tracking keeps me motivated!",
                author: "Sarah Chen",
                role: "Product Designer",
              },
              {
                quote:
                  "I've tried many habit trackers, but this is the only one I actually stick with. The design is just beautiful.",
                author: "Michael Torres",
                role: "Software Engineer",
              },
              {
                quote:
                  "The streak feature is addictive in the best way. I haven't missed my morning workout in 60 days!",
                author: "Emma Johnson",
                role: "Fitness Coach",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="h-5 w-5 text-accent fill-accent"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to Build Better Habits?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of people who are transforming their lives, one habit
            at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/signup")}
            >
              Start Your Journey
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              © 2025 Habit Tracker. Built by Dhavit Gandhi.
            </p>
            <p className="text-sm">Transform your life, one habit at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
