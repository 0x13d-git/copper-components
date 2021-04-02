<!-- uncomment me once i get css -->
<svelte:options tag="copper-auth"/>
<style>
	.input-field {
	  width: 42%;
	  padding: 12px 20px;
	  margin: 8px 0;
	  display: inline-block;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  box-sizing: border-box;
	}
	div {
	  border-radius: 5px;
	  background-color: #f2f2f2;
	  padding: 10px;
	}

	.button {
		background-color: #4CAF50; /* Green */
		border: none;
		color: white;
		padding: 12px 22px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}
</style>

<script>	
	import { initAuth } from './auth';
	import { fade } from 'svelte/transition';
		
	// use custom auth machine store
	const { state, send } = initAuth();
	const loginHandler = async event => {
		const { email, password } = event.target.elements;
		// send login event
		send('LOGIN', {
			provider: 'email',
			email: email.value,
			password: password.value
		});
	};
	// we don't want to be explicit about signingIn state
	$: displayLoginForm = ['signingIn', 'signedOut'].some($state.matches);
</script>
<div class="wrapper">
	<div class="w-full max-w-xs">
		{#if $state.matches('authenticating')}
			<h2 class="text-2xl text-center">Authenticating ...</h2>
		{/if}
		{#if $state.matches('loading')}
			<h2 class="text-2xl text-center">Loading ...</h2>
		{/if}
		
		{#if $state.matches('signingIn')}
			<h2 class="text-2xl text-center">Signing in ...</h2>
		{/if}
		
		{#if $state.matches('signedIn')}
			<div class="text-center">
				<h2 class="text-2xl">Welcome back, {$state.context.user.username}!</h2>
				<button type="button" class="button" on:click={() => send('LOGOUT')}>
					Logout
				</button>
			</div>
		{/if}
		{#if displayLoginForm}
			<form
				on:submit|preventDefault={loginHandler}
				class="px-8 pt-6 pb-8 bg-white shadow-md"
			>
				<div class="mb-4">
					<label for="email">Username</label>
					<input
						class="input-field"
						id="email"
						type="username"
						placeholder="uname"
						value="test"
					/>
				</div>
				<div class="mb-6">
					<label for="password">Password</label>
					<input
						class="input-field"
						id="password"
						type="password"
						placeholder="******************"
						value="test1234"
					/>
				</div>
				<!-- show auth errors -->
				{#if $state.context.error}
					<div class="bg-red-500 p-3 mb-6" transition:fade>
						{$state.context.error}
					</div>
				{/if}
				<div>
					<button class="button" type="submit">Sign In</button>
				</div>
			</form>
		{/if}
	</div>
</div>