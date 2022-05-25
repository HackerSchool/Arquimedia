const config = {
	subjects: [
		{
			name: 'Matemática',
			active: true,
			themes: [
				'Geometria',
				'Funções',
				'Probabilidades e Cálculo Combinatório',
				'Números complexos',
				'Estatística',
			],
			years: [10, 11, 12],
			area: 'Ciências e Tecnologias',
		},
		{
			name: 'Fisico-Química',
			active: false,
			themes: ['Mecânica', 'Eletricidade', 'Química'],
			years: [10, 11],
			area: 'Ciências e Tecnologias',
		},
		{
			name: 'História',
			active: false,
			themes: ['Mecânica', 'Eletricidade', 'Química'],
			years: [10, 11],
			area: 'Línguas e Humanidades',
		},
	],
	areas: ['Ciências e Tecnologias', 'Línguas e Humanidades'],
	devs: [
		{
			name: 'Jerónimo Mendes',
			socials: [
				{
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/jer%C3%B3nimo-mendes/',
				},
			],
		},
		{
			name: 'Miguel Dinis',
			socials: [
				{
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/miguel-dinis-de-sousa-a009851ba/',
				},
			],
		},
		{
			name: 'Nuno Marques',
			socials: [],
		},
		{
			name: 'Afonso Domingues',
			socials: [],
		},
		{
			name: 'Ana Mourão',
			socials: [],
		},
	],
	settingsMenu: ['Conta', 'Privacidade'],
};

export default config;
