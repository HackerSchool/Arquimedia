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
	settingsMenu: ['Conta', 'Privacidade'],
};

export default config;
