<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
						font-size: 0.85rem;
						color: #545353;
					}
					table {
						border: none;
						border-collapse: collapse;
					}
					#sitemap tr.odd {
						background-color: #eee;
					}
					#sitemap tbody tr:hover {
						background-color: #ccc;
					}
					#sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
						color: #0c0c0c;
					}
					#content {
						margin: 0 auto;
						width: 1000px;
					}
					hr {
						margin: 40px 0 30px;
					}
					.expl {
						margin: 10px 6px;
						line-height: 1.5;
					}
					.expl a {
						color: #da3114;
						font-weight: bold;
					}
					a {
						color: #0c0c0c;
						text-decoration: none;
					}
					a:visited {
						color: #777;
					}
					a:hover {
						text-decoration: underline;
					}
					td {
						font-size:0.75rem;
					}
					th {
						text-align:left;
						padding-right:30px;
						font-size:0.75rem;
					}
					thead th {
						border-bottom: 1px solid #0c0c0c;
						/*cursor: pointer;*/
					}
				</style>
			</head>
			<body>
				<div id="content">
					<h1>jeromefitzgerald.com</h1>
					<table id="sitemap" cellpadding="3">
						<thead>
							<tr>
								<th width="60%">URL</th>
								<th width="5%">Priority</th>
								<th width="5%">Images</th>
								<th width="15%">Change Freq.</th>
								<th width="15%">Last Change</th>
							</tr>
						</thead>
						<tbody>
							<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
							<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<tr>
									<td>
										<xsl:variable name="itemURL">
											<xsl:value-of select="sitemap:loc"/>
										</xsl:variable>
										<a href="{$itemURL}">
											<xsl:value-of select="sitemap:loc"/>
										</a>
									</td>
									<td>
										<xsl:value-of select="concat(sitemap:priority*100,'%')"/>
									</td>
									<td>
										<xsl:value-of select="count(image:image)"/>
									</td>
									<td>
										<xsl:value-of select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))"/>
									</td>
									<td>
										<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
					<hr/>
					<p class="expl">
						This is an XML Sitemap, meant for consumption by search engines.
					</p>
					<p class="expl">
						You can find more information about XML sitemaps on <a href="https://www.sitemaps.org/">sitemaps.org</a>.
					</p>
					<p class="expl">
						This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
					</p>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
