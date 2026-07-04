module.exports = {
	// Build directory to scan
	buildDir: '.',

	// Consolidation thresholds
	minOccurrences: 2, // Pattern must appear at least 2 times
	minClasses: 3, // Pattern must have at least 2 classes
	minBytesSaved: 10, // Must save at least 10 bytes

	// Hash configuration
	hashPrefix: 'cp-', // Prefix for consolidated classes
	hashLength: 5, // Hash length (5 = 1M+ combinations)

	// Output options
	manifest: true, // Generate manifest.json
	backup: false, // Create .bak files
};
