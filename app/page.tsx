"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Heart,
  Star,
  Sparkles,
  Camera,
  Video,
  Cake,
  BookOpen,
  Lightbulb,
  Target,
  Baby,
  GraduationCap,
  Crown,
  Users,
  Music,
  Home,
  Smile,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BirthdayPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isBirthday, setIsBirthday] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showMegaExplosion, setShowMegaExplosion] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [showFinalPhoto, setShowFinalPhoto] = useState(false)
  const [secretMode, setSecretMode] = useState(false)
  const [keySequence, setKeySequence] = useState<string[]>([])

  // Fecha del cumpleaños - 8 de junio de 2025
  const birthdayDate = new Date("2025-06-08T00:00:00")

  // Secuencia secreta: "PREVIEW" (P-R-E-V-I-E-W)
  const secretKeys = ["p", "r", "e", "v", "i", "e", "w"]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = birthdayDate.getTime() - now

      if (distance < 0 || secretMode) {
        setIsBirthday(true)
        setShowMegaExplosion(true) // Explosión inicial
        setShowConfetti(true)

        // Quitar la mega explosión después de 6 segundos
        setTimeout(() => setShowMegaExplosion(false), 6000)

        // Mostrar timeline después de 3 segundos de confetti
        setTimeout(() => setShowTimeline(true), 3000)
        // Mostrar foto final después de 5 segundos más
        setTimeout(() => setShowFinalPhoto(true), 8000)
        clearInterval(timer)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [secretMode])

  // Detector de teclas secretas
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      setKeySequence((prev) => {
        const newSequence = [...prev, key].slice(-secretKeys.length)

        // Verificar si la secuencia coincide
        if (newSequence.length === secretKeys.length && newSequence.every((k, i) => k === secretKeys[i])) {
          setSecretMode(true)
          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  useEffect(() => {
    if (!showTimeline) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: "50px" },
    )

    const timer = setTimeout(() => {
      const cards = document.querySelectorAll(".timeline-card")
      cards.forEach((card) => observer.observe(card))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [showTimeline])

  const timelineEvents = [
    {
      year: "2006",
      age: "0 años",
      title: "¡Llegué al mundo! 👶🌟",
      description:
        "8 de junio de 2006 - El día que cambió todo para mi familia. Un pequeño bebé que llenó la casa de alegría y risas. Desde el primer día, mi familia supo que algo especial había llegado a sus vidas, un niño que traería mucha felicidad.",
      quote: '"Es el bebé más hermoso del mundo" - Mamá',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: Baby,
      emotion: "wonder",
    },
    {
      year: "2008",
      age: "2 años",
      title: "Pequeño travieso 🧸😄",
      description:
        "Ya caminaba y corría por toda la casa. Era el niño más alegre y travieso que puedas imaginar. Me encantaba jugar con mis juguetes, hacer reír a mi familia y explorar cada rincón de la casa. Mis primeras palabras llenaron de emoción a todos.",
      quote: '"No para de correr y reírse todo el día" - Papá',
      image: "/placeholder.svg?height=300&width=400",
      type: "video",
      icon: Smile,
      emotion: "discovery",
    },
    {
      year: "2010",
      age: "4 años",
      title: "El niño más feliz 🎈💭",
      description:
        "Preescolar fue una aventura increíble. Hice mis primeros amiguitos, aprendí a compartir y a jugar en equipo. Era el niño que siempre tenía una sonrisa, que hacía reír a todos con sus ocurrencias. Mi familia se sentía orgullosa de lo sociable que era.",
      quote: '"Es el alma de la fiesta en el preescolar" - Maestra',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: Star,
      emotion: "wonder",
    },
    {
      year: "2012",
      age: "6 años",
      title: "Primaria y grandes aventuras 📚🎒",
      description:
        "Entré a primaria con mucha emoción. Me encantaba aprender cosas nuevas, hacer tareas y jugar con mis compañeros en el recreo. Era un niño aplicado que siempre quería hacer feliz a su familia con buenas calificaciones y buen comportamiento.",
      quote: '"Siempre llega contento de la escuela" - Mamá',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: BookOpen,
      emotion: "growth",
    },
    {
      year: "2014",
      age: "8 años",
      title: "Creciendo con la familia 🏠❤️",
      description:
        "Los 8 años fueron especiales. Pasaba mucho tiempo con mi familia, jugando, viendo películas juntos, ayudando en casa. Era un niño feliz que disfrutaba cada momento con sus seres queridos. Las tardes familiares eran lo mejor del mundo.",
      quote: '"Es nuestro niño más amoroso" - Abuela',
      image: "/placeholder.svg?height=300&width=400",
      type: "video",
      icon: Home,
      emotion: "growth",
    },
    {
      year: "2016",
      age: "10 años",
      title: "Descubriendo nuevos intereses 🎮💫",
      description:
        "A los 10 años empecé a interesarme más por la tecnología. Me llamaba la atención cómo funcionaban las cosas, especialmente las computadoras. Pasaba tiempo explorando y aprendiendo, pero siempre equilibrando con juegos y tiempo en familia.",
      quote: '"Le gusta mucho aprender cosas nuevas" - Papá',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: Lightbulb,
      emotion: "discovery",
    },
    {
      year: "2018",
      age: "12 años",
      title: "Adolescencia y nuevas amistades 👥💫",
      description:
        "La secundaria trajo nuevos amigos y nuevas experiencias. Me volví más curioso sobre la tecnología y las computadoras. Mis amigos venían a casa y nos divertíamos mucho. Mi familia veía cómo crecía y maduraba, pero siempre manteniendo mi esencia alegre.",
      quote: '"Ya no es solo nuestro niño, está creciendo" - Mamá',
      image: "/placeholder.svg?height=300&width=400",
      type: "video",
      icon: Users,
      emotion: "growth",
    },
    {
      year: "2020",
      age: "14 años",
      title: "Pandemia y tiempo en familia 🏠💪",
      description:
        "La pandemia nos unió más como familia. Pasamos mucho tiempo juntos en casa, jugando, viendo series, cocinando. Fue cuando realmente empecé a explorar más las computadoras, pero siempre con el apoyo y la compañía de mi familia.",
      quote: '"En casa descubrimos lo unidos que somos" - Familia',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: Target,
      emotion: "growth",
    },
    {
      year: "2022",
      age: "16 años",
      title: "Creciendo y soñando 🚀❤️",
      description:
        "Los 16 llegaron con nuevas responsabilidades y quizás algún primer amor. Ya tenía más claro lo que me gustaba: la tecnología me fascinaba cada vez más. Mi familia veía cómo maduraba y cómo cada día tenía metas más claras sobre mi futuro.",
      quote: '"Ya tiene sus propios sueños y metas" - Papá',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: Music,
      emotion: "achievement",
    },
    {
      year: "2024",
      age: "18 años",
      title: "Mayoría de edad y un nuevo camino 🎓💻",
      description:
        "¡18 años! Mayoría de edad y una decisión que cambiaría mi vida: estudiar programación. Todo ese interés por la tecnología que había crecido en mí finalmente encontró su propósito. Mi familia estaba orgullosa de verme elegir mi camino con tanta determinación.",
      quote: '"Sabíamos que encontrarías tu pasión" - Mamá',
      image: "/placeholder.svg?height=300&width=400",
      type: "video",
      icon: GraduationCap,
      emotion: "achievement",
    },
    {
      year: "2025",
      age: "19 años",
      title: "¡HOY! Mi primer año como programador 🎂👨‍💻",
      description:
        "Aquí estoy, celebrando 19 años de vida y mi primer año estudiando programación. Cada línea de código que aprendo es un paso hacia mis sueños. Mi familia sigue siendo mi mayor apoyo, mi motivación para nunca rendirme en este hermoso camino que elegí.",
      quote: '"Estamos orgullosos del joven en que te has convertido" - Toda la familia',
      image: "/placeholder.svg?height=300&width=400",
      type: "photo",
      icon: Crown,
      emotion: "celebration",
    },
    {
      year: "Futuro",
      age: "∞",
      title: "El programador que seré 🚀🌌",
      description:
        "Este cumpleaños marca el inicio de mi verdadera aventura. Cada día que pasa en mi carrera de programación me acerca más a mis sueños. Nada me hará bajar de este camino. Mi familia cree en mí, y eso me da la fuerza para conquistar cualquier desafío que venga.",
      quote: '"El mejor programador que puedes ser, lo serás" - Mi promesa',
      image: "/placeholder.svg?height=300&width=400",
      type: "video",
      icon: Sparkles,
      emotion: "future",
    },
  ]

  const getEmotionColors = (emotion: string) => {
    switch (emotion) {
      case "wonder":
        return "from-blue-400 to-cyan-400"
      case "discovery":
        return "from-green-400 to-emerald-400"
      case "breakthrough":
        return "from-yellow-400 to-orange-400"
      case "struggle":
        return "from-red-400 to-pink-400"
      case "growth":
        return "from-purple-400 to-indigo-400"
      case "achievement":
        return "from-amber-400 to-yellow-400"
      case "celebration":
        return "from-pink-400 to-rose-400"
      case "future":
        return "from-violet-400 to-purple-400"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Indicador de modo secreto */}
      {secretMode && (
        <div className="fixed top-4 right-4 z-50 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-lg px-4 py-2">
          <p className="text-green-300 text-sm font-semibold">🕵️ MODO PREVIEW ACTIVADO</p>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-5 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* MEGA EXPLOSIÓN DE BIENVENIDA - Solo por 6 segundos */}
      {showMegaExplosion && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* CONFETTI GIGANTE DE BIENVENIDA */}
          {[...Array(150)].map((_, i) => (
            <div
              key={`mega-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 3}s`,
                animationIterationCount: "3",
              }}
            >
              <div
                className="rounded-full shadow-lg"
                style={{
                  width: `${8 + Math.random() * 15}px`,
                  height: `${8 + Math.random() * 15}px`,
                  background: `hsl(${Math.random() * 360}, 85%, 65%)`,
                  boxShadow: `0 0 ${6 + Math.random() * 10}px hsl(${Math.random() * 360}, 85%, 65%)`,
                }}
              ></div>
            </div>
          ))}

          {/* GLOBOS DE BIENVENIDA */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationIterationCount: "3",
              }}
            >
              <div
                className="rounded-full shadow-2xl"
                style={{
                  width: `${20 + Math.random() * 30}px`,
                  height: `${25 + Math.random() * 35}px`,
                  background: `linear-gradient(45deg, hsl(${Math.random() * 360}, 80%, 60%), hsl(${Math.random() * 360}, 80%, 80%))`,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                }}
              ></div>
            </div>
          ))}

          {/* EMOJIS DE BIENVENIDA */}
          {["🎂", "🎉", "🎈", "🎁", "✨", "🌟", "💫", "🎊"].map((emoji, i) => (
            <div
              key={`emoji-${i}`}
              className="absolute animate-spin"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationIterationCount: "2",
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}

      {/* CONFETTI NORMAL - Continúa después de la explosión */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Confetti normal */}
          {[...Array(100)].map((_, i) => (
            <div
              key={`normal-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationIterationCount: "infinite",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                }}
              ></div>
            </div>
          ))}

          {/* Confetti que cae */}
          {[...Array(150)].map((_, i) => (
            <div
              key={`fall-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animation: `fall ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${2 + Math.random() * 6}px`,
                  height: `${2 + Math.random() * 6}px`,
                  background: `hsl(${Math.random() * 360}, 80%, 70%)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      {/* Final Photo Modal */}
      {showFinalPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center animate-in fade-in zoom-in duration-1000">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-pulse">¡19 AÑOS DE PURA VIDA! ✨</h2>

            <div className="relative mb-8">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Foto final de cumpleaños"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border-4 border-gradient-to-r from-pink-400 to-purple-400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            <p className="text-2xl md:text-3xl text-gray-200 mb-6 font-semibold">
              De un bebé alegre a un joven con sueños infinitos
            </p>

            <p className="text-xl text-gray-300 mb-8 italic">
              "19 años de amor familiar, crecimiento y ahora... ¡mi primer año como programador!"
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
              <Button
                onClick={() => setShowFinalPhoto(false)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                ¡Continuar celebrando!
              </Button>

              {secretMode && (
                <Button
                  onClick={() => {
                    setSecretMode(false)
                    setIsBirthday(false)
                    setShowConfetti(false)
                    setShowMegaExplosion(false)
                    setShowTimeline(false)
                    setShowFinalPhoto(false)
                    setVisibleCards([])
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  🕵️ Salir del Preview
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {!isBirthday ? (
            <>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                MI CUMPLEAÑOS
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">Algo especial está por llegar...</p>
              <p className="text-lg text-gray-400 italic">"El 8 de junio será un día muy especial 💙"</p>
            </>
          ) : (
            <>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-pulse">
                ¡19 AÑOS DE AMOR!
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">Un viaje de familia, crecimiento y nuevos sueños</p>
              <p className="text-lg text-gray-400 italic">
                "De bebé alegre a joven soñador - Cada año una bendición familiar"
              </p>
            </>
          )}
        </div>
      </header>

      {/* Countdown Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {!isBirthday ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
                <Calendar className="text-purple-400" />
                Faltan...
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Minutos", value: timeLeft.minutes },
                  { label: "Segundos", value: timeLeft.seconds },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-purple-400/30 shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl md:text-4xl font-bold text-purple-300 mb-2">{item.value}</div>
                      <div className="text-gray-300 font-medium">{item.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xl text-gray-300 mb-4">Para una sorpresa muy especial... 🎁✨</p>
              <p className="text-lg text-gray-400 italic">"Familia, prepárense para algo increíble el 8 de junio 💙"</p>
            </>
          ) : (
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-4 animate-bounce">
                ¡19 AÑOS HOY! 🎂
              </h2>
              <p className="text-2xl md:text-3xl text-white mb-8">¡FELIZ CUMPLEAÑOS! 🎉🎈✨</p>
              <Cake className="w-20 h-20 mx-auto text-pink-400 animate-spin mb-8" />

              {showTimeline && (
                <div className="animate-in fade-in slide-in-from-bottom duration-1000">
                  <p className="text-2xl md:text-3xl text-cyan-300 mb-4 font-bold">
                    {secretMode ? "🕵️ MODO PREVIEW - ¡SORPRESA FAMILIA!" : "¡SORPRESA FAMILIA!"} 💙
                  </p>
                  <p className="text-xl text-gray-300">Aquí está mi historia completa... ⬇️</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section - Solo se muestra cuando es cumpleaños Y showTimeline es true */}
      {isBirthday && showTimeline && (
        <section className="relative z-10 py-16 px-4 animate-in fade-in slide-in-from-bottom duration-2000">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 flex items-center justify-center gap-3">
              <Heart className="text-pink-400" />
              Mi Historia de Vida
              <Star className="text-yellow-400" />
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>

              {timelineEvents.map((event, index) => {
                const Icon = event.icon
                const isVisible = visibleCards.includes(index)

                return (
                  <div
                    key={index}
                    data-index={index}
                    className={`timeline-card relative flex items-center mb-20 transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${getEmotionColors(event.emotion)} rounded-full z-10 shadow-lg flex items-center justify-center border-4 border-white`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                      <Card className="bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 group">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <span
                              className={`text-2xl font-bold bg-gradient-to-r ${getEmotionColors(event.emotion)} bg-clip-text text-transparent`}
                            >
                              {event.year}
                            </span>
                            <span className="text-lg text-gray-400">({event.age})</span>
                            {event.type === "video" ? (
                              <Video className="w-5 h-5 text-red-400" />
                            ) : (
                              <Camera className="w-5 h-5 text-blue-400" />
                            )}
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                            {event.title}
                          </h3>

                          <div className="relative overflow-hidden rounded-lg mb-6">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                            {event.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Video className="w-12 h-12 text-white opacity-80" />
                              </div>
                            )}
                          </div>

                          <p className="text-gray-300 leading-relaxed mb-6 text-lg">{event.description}</p>

                          <blockquote className="border-l-4 border-purple-400 pl-4 italic text-gray-400 bg-white/5 p-4 rounded-r-lg">
                            {event.quote}
                          </blockquote>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Emotional Final Section - Solo cuando es cumpleaños Y se muestra timeline */}
      {isBirthday && showTimeline && (
        <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-2000">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-8">Gracias por estos 19 años 💙</h3>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
                19 años de vida, 19 años de amor incondicional, 19 años de risas, travesuras y crecimiento. De ese bebé
                alegre que llenaba la casa de risas, al joven que ahora estudia programación con determinación.
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Cada etapa de mi vida ha sido especial gracias a ustedes. Ahora que inicio mi carrera como programador,
                sé que tengo el mejor equipo de apoyo: mi familia que siempre ha creído en mí.
              </p>

              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Nada me hará bajar de este camino. ¡Vamos por más! 🚀💻
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <Button
                onClick={() => setShowFinalPhoto(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Camera className="w-5 h-5 mr-2" />
                Ver foto especial
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Heart className="w-5 h-5 mr-2" />
                Los amo familia
              </Button>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-400 italic">
                "19 años de bendiciones familiares, y ahora... ¡el inicio de mi aventura como programador!"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Floating Hearts - Solo cuando es cumpleaños */}
      {isBirthday && (
        <div className="fixed bottom-10 right-10 z-40">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400 animate-bounce opacity-60"
              style={{
                animationDelay: `${i * 1}s`,
                animationDuration: "3s",
                bottom: `${i * 15}px`,
                right: `${i * 8}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* CSS para la animación de caída del confetti */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
