import { DrawingItem, StampItem } from '../types/game';

export const EDUCATIONAL_DRAWINGS: DrawingItem[] = [
  {
    id: 'leaozinho',
    title: 'Leãozinho Valentim',
    category: 'animais',
    difficulty: 'fácil',
    viewBox: '0 0 500 500',
    badgeEmoji: '🦁',
    funFact: 'O leão é conhecido como o rei da savana! O seu rugido forte pode ser ouvido a até 8 quilômetros de distância.',
    audioNarration: 'Leãozinho Valentim! Ele tem uma juba fofa e adora brincar e descansar com sua família.',
    paths: [
      // Mane (Juba grandona)
      {
        id: 'mane',
        name: 'Juba Fofa',
        d: 'M 250,50 C 290,50 330,70 360,100 C 390,80 430,100 440,140 C 460,180 440,220 445,260 C 450,300 420,340 395,370 C 400,410 360,440 320,445 C 285,450 250,430 250,430 C 250,430 215,450 180,445 C 140,440 100,410 105,370 C 80,340 50,300 55,260 C 60,220 40,180 60,140 C 70,100 110,80 140,100 C 170,70 210,50 250,50 Z',
        numberHint: 2,
        numberPos: { x: 250, y: 85 },
        targetColor: '#F97316',
        strokeWidth: 7
      },
      // Left Ear Outer
      {
        id: 'ear_outer_left',
        name: 'Orelha Esquerda',
        d: 'M 140,140 C 120,100 160,80 180,110 Z',
        numberHint: 3,
        numberPos: { x: 145, y: 110 },
        targetColor: '#FBBF24',
        strokeWidth: 6
      },
      // Left Ear Inner
      {
        id: 'ear_inner_left',
        name: 'Dentro da Orelha',
        d: 'M 145,130 C 135,110 160,100 170,118 Z',
        numberHint: 8,
        numberPos: { x: 155, y: 122 },
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Right Ear Outer
      {
        id: 'ear_outer_right',
        name: 'Orelha Direita',
        d: 'M 360,140 C 380,100 340,80 320,110 Z',
        numberHint: 3,
        numberPos: { x: 355, y: 110 },
        targetColor: '#FBBF24',
        strokeWidth: 6
      },
      // Right Ear Inner
      {
        id: 'ear_inner_right',
        name: 'Dentro da Orelha Direita',
        d: 'M 355,130 C 365,110 340,100 330,118 Z',
        numberHint: 8,
        numberPos: { x: 345, y: 122 },
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Face
      {
        id: 'face',
        name: 'Rosto Amigável',
        d: 'M 250,110 C 330,110 370,170 370,250 C 370,330 320,380 250,380 C 180,380 130,330 130,250 C 130,170 170,110 250,110 Z',
        numberHint: 3,
        numberPos: { x: 250, y: 155 },
        targetColor: '#FBBF24',
        strokeWidth: 7
      },
      // Snout / Muzzle (Focinho)
      {
        id: 'snout',
        name: 'Focinho Fofo',
        d: 'M 250,230 C 290,230 310,270 295,310 C 280,335 220,335 205,310 C 190,270 210,230 250,230 Z',
        numberHint: 15,
        numberPos: { x: 250, y: 315 },
        targetColor: '#FDE047',
        strokeWidth: 6
      },
      // Nose
      {
        id: 'nose',
        name: 'Narizinho',
        d: 'M 235,245 C 235,240 265,240 265,245 C 265,260 250,275 250,275 C 250,275 235,260 235,245 Z',
        numberHint: 1,
        numberPos: { x: 250, y: 255 },
        targetColor: '#EF4444',
        strokeWidth: 5
      },
      // Cheeks Left
      {
        id: 'cheek_left',
        name: 'Bochecha Esquerda',
        d: 'M 175,260 C 190,260 190,285 175,285 C 160,285 160,260 175,260 Z',
        numberHint: 8,
        numberPos: { x: 175, y: 272 },
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Cheeks Right
      {
        id: 'cheek_right',
        name: 'Bochecha Direita',
        d: 'M 325,260 C 340,260 340,285 325,285 C 310,285 310,260 325,260 Z',
        numberHint: 8,
        numberPos: { x: 325, y: 272 },
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Eye Left
      {
        id: 'eye_left',
        name: 'Olho Esquerdo',
        d: 'M 205,190 C 215,190 220,205 215,215 C 205,225 195,215 195,205 C 195,195 200,190 205,190 Z',
        defaultFill: '#1E293B',
        isOutline: true
      },
      // Eye Right
      {
        id: 'eye_right',
        name: 'Olho Direito',
        d: 'M 295,190 C 305,190 310,205 305,215 C 295,225 285,215 285,205 C 285,195 290,190 295,190 Z',
        defaultFill: '#1E293B',
        isOutline: true
      },
      // Smile Outline
      {
        id: 'smile_mouth',
        name: 'Boca Sorridente',
        d: 'M 250,275 L 250,295 M 235,295 C 240,310 260,310 265,295',
        isOutline: true,
        strokeWidth: 5
      }
    ]
  },
  {
    id: 'foguete',
    title: 'Foguete Espacial Astro',
    category: 'natureza',
    difficulty: 'fácil',
    viewBox: '0 0 500 500',
    badgeEmoji: '🚀',
    funFact: 'Os astronautas viajam em foguetes velozes para estudar o espaço, as estrelas e a Lua!',
    audioNarration: 'Foguete Astro! Contagem regressiva: 3, 2, 1... Decolagem rumo às estrelas!',
    paths: [
      // Space Background Planet Saturn
      {
        id: 'saturn_ring',
        name: 'Anel do Planeta',
        d: 'M 350,80 C 440,80 450,110 390,120 C 330,130 320,100 350,80 Z',
        numberHint: 2,
        targetColor: '#F97316',
        strokeWidth: 5
      },
      {
        id: 'saturn_body',
        name: 'Planeta Saturno',
        d: 'M 380,70 C 405,70 420,90 420,110 C 420,130 400,140 380,140 C 355,140 340,120 340,100 C 340,80 355,70 380,70 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 6
      },
      // Star 1
      {
        id: 'star_1',
        name: 'Estrela Brilhante 1',
        d: 'M 90,60 L 98,75 L 115,77 L 102,90 L 106,108 L 90,98 L 74,108 L 78,90 L 65,77 L 82,75 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 5
      },
      // Star 2
      {
        id: 'star_2',
        name: 'Estrela Brilhante 2',
        d: 'M 410,260 L 416,272 L 430,274 L 420,284 L 423,298 L 410,290 L 397,298 L 400,284 L 390,274 L 404,272 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 5
      },
      // Rocket Tip
      {
        id: 'rocket_nose',
        name: 'Ponta do Foguete',
        d: 'M 250,70 C 275,100 295,145 295,170 L 205,170 C 205,145 225,100 250,70 Z',
        numberHint: 1,
        targetColor: '#EF4444',
        strokeWidth: 7
      },
      // Left Wing Fin
      {
        id: 'rocket_wing_left',
        name: 'Asa Esquerda',
        d: 'M 205,270 L 140,340 C 130,370 170,370 190,360 L 205,330 Z',
        numberHint: 5,
        targetColor: '#06B6D4',
        strokeWidth: 6
      },
      // Right Wing Fin
      {
        id: 'rocket_wing_right',
        name: 'Asa Direita',
        d: 'M 295,270 L 360,340 C 370,370 330,370 310,360 L 295,330 Z',
        numberHint: 5,
        targetColor: '#06B6D4',
        strokeWidth: 6
      },
      // Rocket Main Body
      {
        id: 'rocket_hull',
        name: 'Corpo do Foguete',
        d: 'M 205,170 L 295,170 C 310,230 305,300 295,350 L 205,350 C 195,300 190,230 205,170 Z',
        numberHint: 11,
        targetColor: '#FFFFFF',
        strokeWidth: 7
      },
      // Porthole Window Frame
      {
        id: 'rocket_window_ring',
        name: 'Aro da Janela',
        d: 'M 250,210 C 275,210 290,225 290,250 C 290,275 275,290 250,290 C 225,290 210,275 210,250 C 210,225 225,210 250,210 Z',
        numberHint: 2,
        targetColor: '#F97316',
        strokeWidth: 6
      },
      // Porthole Glass
      {
        id: 'rocket_window_glass',
        name: 'Vidro da Janela',
        d: 'M 250,225 C 265,225 275,235 275,250 C 275,265 265,275 250,275 C 235,275 225,265 225,250 C 225,235 235,225 250,225 Z',
        numberHint: 6,
        targetColor: '#3B82F6',
        strokeWidth: 5
      },
      // Exhaust Flame Outer
      {
        id: 'rocket_flame_outer',
        name: 'Fogo do Foguete',
        d: 'M 215,355 C 215,380 230,420 250,450 C 270,420 285,380 285,355 Z',
        numberHint: 1,
        targetColor: '#EF4444',
        strokeWidth: 6
      },
      // Exhaust Flame Inner
      {
        id: 'rocket_flame_inner',
        name: 'Fogo Amarelo Quente',
        d: 'M 230,355 C 230,375 240,400 250,415 C 260,400 270,375 270,355 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 4
      }
    ]
  },
  {
    id: 'macazinha',
    title: 'Maçãzinha Nutritiva',
    category: 'frutas',
    difficulty: 'fácil',
    viewBox: '0 0 500 500',
    badgeEmoji: '🍎',
    funFact: 'As maçãs flutuam na água porque 25% do seu volume é puro ar! Além de deliciosas, são cheias de vitaminas.',
    audioNarration: 'Maçãzinha alegre! Comer frutinhas frescas todos os dias nos dá muita energia para brincar.',
    paths: [
      // Stem (Cabinho)
      {
        id: 'stem',
        name: 'Cabinho da Maçã',
        d: 'M 245,150 C 245,110 260,85 275,65 C 285,70 285,85 270,115 C 260,135 255,150 255,150 Z',
        numberHint: 9,
        targetColor: '#A16207',
        strokeWidth: 6
      },
      // Leaf (Folhinha)
      {
        id: 'leaf',
        name: 'Folha Verde',
        d: 'M 260,110 C 290,90 350,95 360,125 C 340,155 285,145 260,110 Z',
        numberHint: 4,
        targetColor: '#22C55E',
        strokeWidth: 6
      },
      // Apple Body
      {
        id: 'apple_body',
        name: 'Casca da Maçã',
        d: 'M 250,155 C 310,135 410,165 410,265 C 410,365 330,425 270,435 C 255,437 245,437 230,435 C 170,425 90,365 90,265 C 90,165 190,135 250,155 Z',
        numberHint: 1,
        targetColor: '#EF4444',
        strokeWidth: 8
      },
      // Rosy Cheek Left
      {
        id: 'apple_cheek_l',
        name: 'Bochecha Esquerda',
        d: 'M 170,290 C 190,290 190,315 170,315 C 150,315 150,290 170,290 Z',
        numberHint: 8,
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Rosy Cheek Right
      {
        id: 'apple_cheek_r',
        name: 'Bochecha Direita',
        d: 'M 330,290 C 350,290 350,315 330,315 C 310,315 310,290 330,290 Z',
        numberHint: 8,
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Eye Left
      {
        id: 'apple_eye_l',
        name: 'Olho Esquerdo',
        d: 'M 195,245 C 205,245 210,260 205,270 C 195,275 185,265 185,255 C 185,248 190,245 195,245 Z',
        defaultFill: '#1E293B',
        isOutline: true
      },
      // Eye Right
      {
        id: 'apple_eye_r',
        name: 'Olho Direito',
        d: 'M 305,245 C 315,245 320,260 315,270 C 305,275 295,265 295,255 C 295,248 300,245 305,245 Z',
        defaultFill: '#1E293B',
        isOutline: true
      },
      // Big Smile
      {
        id: 'apple_smile',
        name: 'Sorriso Contente',
        d: 'M 225,290 C 235,325 265,325 275,290',
        isOutline: true,
        strokeWidth: 6
      }
    ]
  },
  {
    id: 'borboleta',
    title: 'Borboleta Encantada',
    category: 'natureza',
    difficulty: 'médio',
    viewBox: '0 0 500 500',
    badgeEmoji: '🦋',
    funFact: 'As borboletas têm o paladar nas patinhas! É com as patas que elas sentem o doce néctar das flores.',
    audioNarration: 'Borboleta mágica! Suas asinhas batem suavemente colorindo todo o jardim.',
    paths: [
      // Upper Wing Left
      {
        id: 'wing_top_l',
        name: 'Asa Superior Esquerda',
        d: 'M 240,210 C 180,120 70,110 60,180 C 50,250 140,290 240,260 Z',
        numberHint: 7,
        targetColor: '#8B5CF6',
        strokeWidth: 6
      },
      // Upper Wing Right
      {
        id: 'wing_top_r',
        name: 'Asa Superior Direita',
        d: 'M 260,210 C 320,120 430,110 440,180 C 450,250 360,290 260,260 Z',
        numberHint: 7,
        targetColor: '#8B5CF6',
        strokeWidth: 6
      },
      // Wing Circle Left
      {
        id: 'wing_spot_top_l',
        name: 'Círculo Mágico Esquerdo',
        d: 'M 140,180 C 160,180 170,200 160,215 C 145,225 125,220 125,200 C 125,185 130,180 140,180 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 5
      },
      // Wing Circle Right
      {
        id: 'wing_spot_top_r',
        name: 'Círculo Mágico Direito',
        d: 'M 360,180 C 380,180 390,200 380,215 C 365,225 345,220 345,200 C 345,185 350,180 360,180 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 5
      },
      // Lower Wing Left
      {
        id: 'wing_bot_l',
        name: 'Asa Inferior Esquerda',
        d: 'M 240,265 C 160,270 90,340 120,400 C 150,440 220,380 240,310 Z',
        numberHint: 8,
        targetColor: '#EC4899',
        strokeWidth: 6
      },
      // Lower Wing Right
      {
        id: 'wing_bot_r',
        name: 'Asa Inferior Direita',
        d: 'M 260,265 C 340,270 410,340 380,400 C 350,440 280,380 260,310 Z',
        numberHint: 8,
        targetColor: '#EC4899',
        strokeWidth: 6
      },
      // Wing Heart Left
      {
        id: 'wing_spot_bot_l',
        name: 'Pinta Inferior Esquerda',
        d: 'M 180,340 C 195,340 200,360 190,370 C 180,375 165,370 165,355 C 165,345 170,340 180,340 Z',
        numberHint: 5,
        targetColor: '#06B6D4',
        strokeWidth: 4
      },
      // Wing Heart Right
      {
        id: 'wing_spot_bot_r',
        name: 'Pinta Inferior Direita',
        d: 'M 320,340 C 335,340 340,360 330,370 C 320,375 305,370 305,355 C 305,345 310,340 320,340 Z',
        numberHint: 5,
        targetColor: '#06B6D4',
        strokeWidth: 4
      },
      // Body (Corpinho)
      {
        id: 'butterfly_body',
        name: 'Corpo da Borboleta',
        d: 'M 250,190 C 265,190 270,250 265,330 C 260,370 250,380 250,380 C 250,380 240,370 235,330 C 230,250 235,190 250,190 Z',
        numberHint: 4,
        targetColor: '#22C55E',
        strokeWidth: 6
      },
      // Head
      {
        id: 'butterfly_head',
        name: 'Cabecinha',
        d: 'M 250,140 C 270,140 280,160 280,175 C 280,195 265,205 250,205 C 235,205 220,195 220,175 C 220,160 230,140 250,140 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 6
      },
      // Antennas
      {
        id: 'antenna_left',
        name: 'Antena Esquerda',
        d: 'M 240,145 C 220,110 190,105 185,120 C 180,135 200,140 205,130',
        isOutline: true,
        strokeWidth: 5
      },
      {
        id: 'antenna_right',
        name: 'Antena Direita',
        d: 'M 260,145 C 280,110 310,105 315,120 C 320,135 300,140 295,130',
        isOutline: true,
        strokeWidth: 5
      }
    ]
  },
  {
    id: 'carrinho',
    title: 'Carrinho Pipi',
    category: 'veiculos',
    difficulty: 'fácil',
    viewBox: '0 0 500 500',
    badgeEmoji: '🚗',
    funFact: 'O primeiro automóvel moderno foi inventado há mais de 130 anos! Hoje muitos carros funcionam com eletricidade limpa.',
    audioNarration: 'Bibi! O carrinho Pipi adora passear pelo parque em dias de sol.',
    paths: [
      // Car Cabin Roof
      {
        id: 'car_roof',
        name: 'Capota do Carro',
        d: 'M 160,230 L 210,150 L 330,150 L 375,230 Z',
        numberHint: 1,
        targetColor: '#EF4444',
        strokeWidth: 7
      },
      // Window Front
      {
        id: 'car_window_f',
        name: 'Janela da Frente',
        d: 'M 285,165 L 320,165 L 355,225 L 285,225 Z',
        numberHint: 5,
        targetColor: '#06B6D4',
        strokeWidth: 5
      },
      // Window Rear
      {
        id: 'car_window_r',
        name: 'Janela de Trás',
        d: 'M 220,165 L 270,165 L 270,225 L 180,225 Z',
        numberHint: 5,
        targetColor: '#06B6D4',
        strokeWidth: 5
      },
      // Car Main Body
      {
        id: 'car_chassis',
        name: 'Chassi do Carro',
        d: 'M 90,230 C 90,230 110,230 130,230 L 400,230 C 425,230 440,250 440,280 L 440,320 C 440,335 430,340 415,340 L 390,340 C 385,310 355,290 325,290 C 295,290 265,310 260,340 L 210,340 C 205,310 175,290 145,290 C 115,290 85,310 80,340 L 65,340 C 50,340 40,330 40,310 L 40,280 C 40,250 65,230 90,230 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 8
      },
      // Headlight
      {
        id: 'car_light_f',
        name: 'Farol Dianteiro',
        d: 'M 425,250 C 438,250 445,260 445,275 C 445,290 438,300 425,300 Z',
        numberHint: 2,
        targetColor: '#F97316',
        strokeWidth: 5
      },
      // Wheel Left Tire
      {
        id: 'tire_l',
        name: 'Pneu Dianteiro',
        d: 'M 145,295 C 175,295 195,315 195,345 C 195,375 175,395 145,395 C 115,395 95,375 95,345 C 95,315 115,295 145,295 Z',
        numberHint: 10,
        targetColor: '#1E293B',
        strokeWidth: 7
      },
      // Wheel Left Hubcap
      {
        id: 'hubcap_l',
        name: 'Calota Dianteira',
        d: 'M 145,325 C 158,325 168,335 168,345 C 168,358 158,368 145,368 C 132,368 122,358 122,345 C 122,335 132,325 145,325 Z',
        numberHint: 11,
        targetColor: '#FFFFFF',
        strokeWidth: 5
      },
      // Wheel Right Tire
      {
        id: 'tire_r',
        name: 'Pneu Traseiro',
        d: 'M 325,295 C 355,295 375,315 375,345 C 375,375 355,395 325,395 C 295,395 275,375 275,345 C 275,315 295,295 325,295 Z',
        numberHint: 10,
        targetColor: '#1E293B',
        strokeWidth: 7
      },
      // Wheel Right Hubcap
      {
        id: 'hubcap_r',
        name: 'Calota Traseira',
        d: 'M 325,325 C 338,325 348,335 348,345 C 348,358 338,368 325,368 C 312,368 302,358 302,345 C 302,335 312,325 325,325 Z',
        numberHint: 11,
        targetColor: '#FFFFFF',
        strokeWidth: 5
      }
    ]
  },
  {
    id: 'numero_um',
    title: 'Número 1 Campeão',
    category: 'numeros',
    difficulty: 'fácil',
    viewBox: '0 0 500 500',
    badgeEmoji: '🥇',
    funFact: 'O número 1 representa unidade! Só existe uma Terra onde vivemos e um Sol brilhando para nós!',
    audioNarration: 'Número Um campeão! Vamos aprender a contar: um, dois, três e já!',
    paths: [
      // Crown Base
      {
        id: 'crown_body',
        name: 'Coroa de Campeão',
        d: 'M 190,105 L 210,55 L 250,85 L 290,55 L 310,105 Z',
        numberHint: 3,
        targetColor: '#FBBF24',
        strokeWidth: 6
      },
      // Crown Jewels
      {
        id: 'crown_gem_center',
        name: 'Joia da Coroa',
        d: 'M 250,80 C 257,80 262,85 262,92 C 262,99 257,104 250,104 C 243,104 238,99 238,92 C 238,85 243,80 250,80 Z',
        numberHint: 1,
        targetColor: '#EF4444',
        strokeWidth: 4
      },
      // Number 1 Main Body
      {
        id: 'num1_body',
        name: 'Corpo do Número 1',
        d: 'M 160,200 L 220,150 L 280,150 L 280,390 L 210,390 L 210,230 L 170,260 Z',
        numberHint: 6,
        targetColor: '#3B82F6',
        strokeWidth: 8
      },
      // Base Pedestal
      {
        id: 'num1_pedestal',
        name: 'Pedestal de Ouro',
        d: 'M 150,390 L 340,390 C 350,390 355,405 350,420 L 340,440 L 150,440 L 140,420 C 135,405 140,390 150,390 Z',
        numberHint: 2,
        targetColor: '#F97316',
        strokeWidth: 7
      },
      // Left Rosy Cheek
      {
        id: 'num1_cheek',
        name: 'Bochecha Vermelha',
        d: 'M 220,240 C 230,240 230,255 220,255 C 210,255 210,240 220,240 Z',
        numberHint: 8,
        targetColor: '#EC4899',
        strokeWidth: 4
      },
      // Eyes
      {
        id: 'num1_eye_l',
        name: 'Olho Esquerdo',
        d: 'M 235,190 C 242,190 245,198 242,206 C 238,212 230,208 230,200 C 230,193 232,190 235,190 Z',
        defaultFill: '#1E293B',
        isOutline: true
      },
      {
        id: 'num1_eye_r',
        name: 'Olho Direito',
        d: 'M 265,190 C 272,190 275,198 272,206 C 268,212 260,208 260,200 C 260,193 262,190 265,190 Z',
        defaultFill: '#1E293B',
        isOutline: true
      },
      // Happy Smile
      {
        id: 'num1_smile',
        name: 'Sorriso Vitorioso',
        d: 'M 235,225 C 245,245 260,245 265,225',
        isOutline: true,
        strokeWidth: 5
      }
    ]
  }
];

export const FUN_STAMPS: StampItem[] = [
  { id: 'star', emoji: '⭐', name: 'Estrela Dourada' },
  { id: 'heart', emoji: '💖', name: 'Coração Rosa' },
  { id: 'rainbow', emoji: '🌈', name: 'Arco-Íris' },
  { id: 'flower', emoji: '🌸', name: 'Florzinha' },
  { id: 'sun', emoji: '🌞', name: 'Sol Sorridente' },
  { id: 'sparkles', emoji: '✨', name: 'Brilho Mágico' },
  { id: 'paw', emoji: '🐾', name: 'Patinha Fofa' },
  { id: 'music', emoji: '🎵', name: 'Nota Musical' }
];
