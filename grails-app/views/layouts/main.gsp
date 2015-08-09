<!DOCTYPE html>
<html ng-app="streamaApp" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Grails"/></title>
		<base href="<g:createLink uri="/" />">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${assetPath(src: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png')}">

		<asset:stylesheet src="application.css"/>
		<asset:javascript src="application.js"/>

		<g:layoutHead/>
	</head>
	<body>


  %{--<video width="400" controls>--}%
    %{--<source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">--}%
    %{--Your browser does not support HTML5 video.--}%
  %{--</video>--}%

  %{--<video width="400" controls>--}%
    %{--<source src="http://46.101.209.74/test.mp4" type="video/mp4">--}%
    %{--Your browser does not support HTML5 video.--}%
  %{--</video>--}%

  %{--<video width="400" controls>--}%
    %{--<source src="http://46.101.209.74:8080/file/serve/24.mp4" type="video/mp4">--}%
    %{--Your browser does not support HTML5 video.--}%
  %{--</video>--}%

		<header class="main" ng-if="!isCurrentState('player')">
			<a class="logo" ui-sref="dash">
        <asset:image src="logo.png"></asset:image>
      </a>

			<ul class="navigation">

        <sec:ifLoggedIn>
          <li><a ui-sref="dash">Dashboard</a></li>
        </sec:ifLoggedIn>

				<sec:ifAnyGranted roles="ROLE_CONTENT_MANAGER">
					<li><a ui-sref="admin.shows">Manage Content</a></li>
				</sec:ifAnyGranted>
				<sec:ifAnyGranted roles="ROLE_ADMIN">
            <li><a ui-sref="admin.users">Admin</a></li>
				</sec:ifAnyGranted>

				<sec:ifLoggedIn>
					<li><a ui-sref="profile">Profile</a></li>
					<li><g:link uri="/j_spring_security_logout">Logout</g:link></li>
				</sec:ifLoggedIn>
			</ul>
		</header>

		<g:layoutBody/>



    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-65974961-1', 'auto');
      ga('send', 'pageview');

    </script>
	</body>
</html>
