import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ContactRequest } from './models/contact-request';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSubmitting = false;
  submitMessage = '';

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly skills = [
    'Programming Languages: Python, Java, C, JavaScript, HTML, CSS',
    'Frameworks: Angular, Spring Boot',
    'Database Management: MySQL, PostgreSQL',
    'Web Development: JSP, REST APIs, Responsive Design',
    'Version Control: Git, GitHub',
    'Development Tools: IntelliJ IDEA, Eclipse, VS Code, Postman',
    'Cloud Platforms: AWS (EC2)',
    'Containerization: Docker'
  ];

  readonly projects = [
    {
      title: 'Student Academic Management System',
      description:
        'Developed a full-stack web application using Spring Boot, MySQL, and JSP to manage student records, grades, secure login, and CRUD operations.',
      extra:
        'Deployed on AWS EC2 with Docker for scalable and reliable cloud-based access.',
      link: 'https://github.com/ABIRAMIRAMACHANDRAN1604/StudentSystem.git'
    },
    {
      title: 'Murugan Temples Website',
      description:
        'Designed a responsive website to present the six sacred Murugan temples using HTML, CSS, and a culturally themed UI.',
      extra:
        'Includes mobile responsiveness, form handling, and accessible page structure.',
      link: 'https://github.com/ABIRAMIRAMACHANDRAN1604/website-front-.git'
    },
    {
      title: 'ATM Management System',
      description:
        'Built an ATM simulation with Java, Spring Boot, JSP, and MySQL covering account creation, card management, deposits, withdrawals, balance checks, and transaction history.',
      extra:
        'Used JPA/Hibernate and layered service-repository design for maintainability.',
      link: 'https://github.com/ABIRAMIRAMACHANDRAN1604/AtmSystem.git'
    }
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService
  ) {}

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    const payload: ContactRequest = this.contactForm.getRawValue();

    this.contactService.submitContactForm(payload).subscribe({
      next: (message: string) => {
        this.submitMessage = message;
        this.contactForm.reset();
        this.isSubmitting = false;
      },
     error: (error) => {
       console.error('Submit error:', error);
       this.submitMessage = 'Unable to send your message right now. Please try again later.';
       this.isSubmitting = false;
     }
    });
  }
}
