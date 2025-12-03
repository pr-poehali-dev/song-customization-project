import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio", "process", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gold">Песня про вас</h1>
          <div className="hidden md:flex gap-6">
            {[
              { id: "home", label: "Главная" },
              { id: "about", label: "О сервисе" },
              { id: "services", label: "Услуги" },
              { id: "portfolio", label: "Портфолио" },
              { id: "process", label: "Процесс" },
              { id: "testimonials", label: "Отзывы" },
              { id: "contact", label: "Контакты" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-colors hover:text-gold ${
                  activeSection === item.id ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/143cc5a1-6849-4617-8800-9ccea7deb82e/files/b96cd415-e7cd-4ed4-8166-151728581d07.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center animate-fade-in relative z-10">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 text-gold">
            Ваша история достойна песни
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Создаём уникальные музыкальные композиции про вашу жизнь, любовь и важные моменты
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-dark text-background font-semibold"
              onClick={() => scrollToSection("contact")}
            >
              Заказать песню
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-background"
              onClick={() => scrollToSection("portfolio")}
            >
              Послушать примеры
            </Button>
          </div>
          <div className="mt-16 gold-line w-24 mx-auto"></div>
        </div>
      </section>

      <section id="about" className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-gold">О сервисе</h2>
            <div className="gold-line w-16 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы — команда профессиональных композиторов, аранжировщиков и исполнителей, 
              создающих персонализированные музыкальные произведения. Каждая песня — это 
              уникальная история, воплощённая в музыке с душой и мастерством.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Music", title: "10+ лет опыта", desc: "В создании профессиональной музыки" },
              { icon: "Award", title: "500+ песен", desc: "Написано для клиентов по всему миру" },
              { icon: "Heart", title: "100% уникально", desc: "Каждая композиция создаётся с нуля" }
            ].map((item, i) => (
              <Card key={i} className="bg-card border-gold/20 hover:border-gold transition-all duration-300">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gold">Наши услуги</h2>
            <div className="gold-line w-16 mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "Gift", title: "Песня в подарок", desc: "Уникальный подарок на день рождения, свадьбу или юбилей" },
              { icon: "Heart", title: "Признание в любви", desc: "Романтическая композиция для признания в чувствах" },
              { icon: "Users", title: "Корпоративный гимн", desc: "Музыкальная идентичность для вашей компании" },
              { icon: "Mic", title: "Песня на событие", desc: "Саундтрек для свадьбы, выпускного или праздника" },
              { icon: "Star", title: "Поздравление", desc: "Музыкальное поздравление с любым событием" },
              { icon: "Sparkles", title: "Индивидуальный заказ", desc: "Любая идея, воплощённая в музыке" }
            ].map((service, i) => (
              <Card 
                key={i} 
                className="bg-card border-gold/20 hover:border-gold hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 group"
              >
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon name={service.icon} className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gold">Портфолио</h2>
            <div className="gold-line w-16 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Примеры наших работ в различных музыкальных стилях
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Романтическая баллада", genre: "Поп-баллада", duration: "3:45" },
              { title: "Свадебная композиция", genre: "Классика", duration: "4:20" },
              { title: "Юбилейная песня", genre: "Джаз", duration: "3:30" },
              { title: "Корпоративный гимн", genre: "Рок", duration: "3:15" },
              { title: "Детская песенка", genre: "Детская", duration: "2:50" },
              { title: "История любви", genre: "R&B", duration: "4:05" }
            ].map((track, i) => (
              <Card 
                key={i} 
                className="bg-card border-gold/20 hover:border-gold transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="aspect-square bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg mb-4 flex items-center justify-center group-hover:from-gold/30 group-hover:to-gold/10 transition-all">
                    <Icon name="Play" className="w-12 h-12 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{track.genre}</span>
                    <span>{track.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gold">Процесс создания</h2>
            <div className="gold-line w-16 mx-auto mb-8"></div>
          </div>
          <div className="space-y-12">
            {[
              { 
                step: "01", 
                title: "Знакомство и бриф", 
                desc: "Узнаём вашу историю, собираем детали, обсуждаем стиль и настроение будущей песни",
                icon: "MessageSquare"
              },
              { 
                step: "02", 
                title: "Создание текста", 
                desc: "Пишем уникальные слова, которые отражают суть вашей истории и эмоции",
                icon: "FileText"
              },
              { 
                step: "03", 
                title: "Музыкальная композиция", 
                desc: "Создаём мелодию и аранжировку, подбираем инструменты и звучание",
                icon: "Music"
              },
              { 
                step: "04", 
                title: "Запись и сведение", 
                desc: "Профессиональная студийная запись вокала и финальная обработка трека",
                icon: "Disc"
              },
              { 
                step: "05", 
                title: "Передача готовой песни", 
                desc: "Получаете готовую композицию в высоком качестве со всеми исходниками",
                icon: "CheckCircle"
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start group">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-3xl font-bold text-gold group-hover:bg-gold group-hover:text-background transition-all">
                    {item.step}
                  </div>
                  {i < 4 && <div className="w-px h-12 bg-gold/30 mt-4"></div>}
                </div>
                <div className="flex-1 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={item.icon} className="w-6 h-6 text-gold" />
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gold">Отзывы клиентов</h2>
            <div className="gold-line w-16 mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Анна Петрова",
                text: "Заказала песню в подарок мужу на годовщину. Он был в восторге! Спасибо за профессионализм и душевность.",
                rating: 5
              },
              {
                name: "Михаил Соколов",
                text: "Корпоративный гимн получился мощным и запоминающимся. Коллектив в восторге, играем его на всех мероприятиях!",
                rating: 5
              },
              {
                name: "Елена Иванова",
                text: "Песня на свадьбу дочери превзошла все ожидания. Гости до сих пор просят прислать запись. Браво!",
                rating: 5
              },
              {
                name: "Дмитрий Волков",
                text: "Профессиональный подход, внимание к деталям и потрясающий результат. Рекомендую всем!",
                rating: 5
              },
              {
                name: "Ольга Морозова",
                text: "Сделали песню-поздравление для мамы на юбилей. Она плакала от счастья. Спасибо огромное!",
                rating: 5
              },
              {
                name: "Александр Краснов",
                text: "Отличная работа! Учли все пожелания, сроки соблюдены. Очень доволен результатом.",
                rating: 5
              }
            ].map((review, i) => (
              <Card key={i} className="bg-card border-gold/20">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Icon key={j} name="Star" className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-gold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gold">Заказать песню</h2>
            <div className="gold-line w-16 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>
          </div>
          <Card className="bg-card border-gold/20">
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input 
                    placeholder="Как к вам обращаться?"
                    className="bg-background border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email или телефон</label>
                  <Input 
                    placeholder="Как с вами связаться?"
                    className="bg-background border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Расскажите о вашей идее</label>
                  <Textarea 
                    placeholder="Для кого песня? Какой повод? Какой стиль предпочитаете? Важные детали..."
                    className="bg-background border-gold/30 focus:border-gold min-h-[150px]"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-background font-semibold"
                  size="lg"
                >
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary/50 py-12 px-4 border-t border-gold/20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gold mb-4">Песня про вас</h3>
          <p className="text-muted-foreground mb-6">Превращаем истории в музыку</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
              <Icon name="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
              <Icon name="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
              <Icon name="Youtube" className="w-6 h-6" />
            </a>
          </div>
          <div className="gold-line w-24 mx-auto mb-6"></div>
          <p className="text-sm text-muted-foreground">
            © 2024 Песня про вас. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;