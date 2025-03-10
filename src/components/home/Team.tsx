
import React from "react";
import { cn } from "@/lib/utils";
import { Github, Twitter, Linkedin } from "lucide-react";
import AnimatedSection from "../shared/AnimatedSection";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  return (
    <AnimatedSection
      className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      delay={index * 100}
      direction="up"
    >
      <div className="relative group overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white text-sm">{member.bio}</div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-primary text-sm mb-4">{member.role}</p>
        <div className="flex space-x-3">
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${member.name}'s GitHub profile`}
            >
              <Github size={18} />
            </a>
          )}
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${member.name}'s Twitter profile`}
            >
              <Twitter size={18} />
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

const Team: React.FC = () => {
  const team: TeamMember[] = [
    {
      id: "member1",
      name: "Shivraj Suman",
      role: "Founder",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Shivraj has extensive expertise in software development and leadership, guiding WeCode's vision and strategy.",
      social: {
        github: "https://github.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "member2",
      name: "Shaurya Pethe",
      role: "Co-founder",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
      bio: "Shaurya heads our business development and client relations, ensuring WeCode delivers exceptional value and service.",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "member3",
      name: "Nikhil Hegde",
      role: "Lead Programmer",
      image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      bio: "Nikhil specializes in backend development and architecture, creating robust and scalable solutions for our clients.",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: "member4",
      name: "Harshit Maurya",
      role: "Lead Programmer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Harshit leads our frontend development efforts, creating intuitive and beautiful user interfaces with a focus on performance.",
      social: {
        github: "https://github.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="team">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Meet Our Expert Coders
          </h2>
          <p className="text-muted-foreground text-lg">
            We're a talented team of developers and designers dedicated to creating exceptional digital experiences.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
